import type { PurchaseOrder } from "@/domain/entities/purchase-order.js";
import type { PurchaseOrderRepository } from "@/domain/repositories/purchase-order-repository.js";
import type { StockRepository } from "@/domain/repositories/stock-repository.js";

interface UpdatePurchaseOrderStatusRequest {
    orderId: string;
    status: 'sent' | 'confirmed' | 'delivered' | 'cancelled';
    expectedDeliveryDate?: Date;
}

interface UpdatePurchaseOrderStatusResponse {
    purchaseOrder: PurchaseOrder;
}

export class UpdatePurchaseOrderStatusUseCase {
    constructor(
        private purchaseOrderRepository: PurchaseOrderRepository,
        private stockRepository: StockRepository
    ) {}

    async execute({ orderId, status, expectedDeliveryDate }: UpdatePurchaseOrderStatusRequest): Promise<UpdatePurchaseOrderStatusResponse> {
        const purchaseOrder = await this.purchaseOrderRepository.findById(orderId);

        if (!purchaseOrder) {
            throw new Error('Purchase order not found');
        }

        switch (status) {
            case 'sent':
                purchaseOrder.markAsSent();
                break;
            case 'confirmed':
                if (!expectedDeliveryDate) {
                    throw new Error('Expected delivery date is required for confirmed orders');
                }
                purchaseOrder.markAsConfirmed(expectedDeliveryDate);
                break;
            case 'delivered':
                purchaseOrder.markAsDelivered();
                const stock = await this.stockRepository.findByProductId(purchaseOrder.productId.toString());
                if (stock) {
                    stock.increaseQuantity(purchaseOrder.quantity);
                    await this.stockRepository.save(stock);
                }
                break;
            case 'cancelled':
                purchaseOrder.markAsCancelled();
                break;
        }

        await this.purchaseOrderRepository.save(purchaseOrder);

        return { purchaseOrder };
    }
}
