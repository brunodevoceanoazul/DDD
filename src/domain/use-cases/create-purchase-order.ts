import { PurchaseOrder } from "@/domain/entities/purchase-order.js";
import type { PurchaseOrderRepository } from "@/domain/repositories/purchase-order-repository.js";
import type { StockRepository } from "@/domain/repositories/stock-repository.js";
import type { SupplierRepository } from "@/domain/repositories/supplier-repository.js";

interface CreatePurchaseOrderRequest {
    productId: string;
    supplierId: string;
    quantity: number;
    unitCost: number;
}

interface CreatePurchaseOrderResponse {
    purchaseOrder: PurchaseOrder;
}

export class CreatePurchaseOrderUseCase {
    constructor(
        private purchaseOrderRepository: PurchaseOrderRepository,
        private stockRepository: StockRepository,
        private supplierRepository: SupplierRepository
    ) {}

    async execute({ productId, supplierId, quantity, unitCost }: CreatePurchaseOrderRequest): Promise<CreatePurchaseOrderResponse> {
        const supplier = await this.supplierRepository.findById(supplierId);

        if (!supplier) {
            throw new Error('Supplier not found');
        }

        const stock = await this.stockRepository.findByProductId(productId);

        if (!stock) {
            throw new Error('Stock not found for this product');
        }

        const totalCost = quantity * unitCost;

        const purchaseOrder = PurchaseOrder.create({
            productId: stock.productId,
            supplierId: supplier.id,
            quantity,
            unitCost,
            totalCost,
            status: 'pending',
            createdAt: new Date(),
        });

        await this.purchaseOrderRepository.create(purchaseOrder);

        return { purchaseOrder };
    }
}
