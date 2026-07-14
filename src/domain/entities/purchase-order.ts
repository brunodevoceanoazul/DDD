import { Entity } from "@/core/entities/entity.js";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

type PurchaseOrderStatus = 'pending' | 'sent' | 'confirmed' | 'delivered' | 'cancelled';

interface PurchaseOrderProps {
    productId: UniqueEntityID;
    supplierId: UniqueEntityID;
    quantity: number;
    unitCost: number;
    totalCost: number;
    status: PurchaseOrderStatus;
    createdAt: Date;
    expectedDeliveryDate?: Date;
    deliveredAt?: Date;
}

export class PurchaseOrder extends Entity<PurchaseOrderProps> {

    get productId() {
        return this.props.productId;
    }

    get supplierId() {
        return this.props.supplierId;
    }

    get quantity() {
        return this.props.quantity;
    }

    get status() {
        return this.props.status;
    }

    get totalCost() {
        return this.props.totalCost;
    }

    get expectedDeliveryDate() {
        return this.props.expectedDeliveryDate;
    }

    set status(status: PurchaseOrderStatus) {
        this.props.status = status;
    }

    set expectedDeliveryDate(date: Date | undefined) {
        this.props.expectedDeliveryDate = date;
    }

    markAsSent() {
        this.props.status = 'sent';
    }

    markAsConfirmed(expectedDeliveryDate: Date) {
        this.props.status = 'confirmed';
        this.props.expectedDeliveryDate = expectedDeliveryDate;
    }

    markAsDelivered() {
        this.props.status = 'delivered';
        this.props.deliveredAt = new Date();
    }

    markAsCancelled() {
        this.props.status = 'cancelled';
    }

    static create(
        props: PurchaseOrderProps,
        id?: UniqueEntityID
    ) {
        const purchaseOrder = new PurchaseOrder(props, id);
        return purchaseOrder;
    }
}
