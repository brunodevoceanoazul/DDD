import type { PurchaseOrder } from "@/domain/entities/purchase-order.js";

export interface PurchaseOrderRepository {
    create(order: PurchaseOrder): Promise<void>;
    findById(id: string): Promise<PurchaseOrder | null>;
    findByProductId(productId: string): Promise<PurchaseOrder[]>;
    save(order: PurchaseOrder): Promise<void>;
}
