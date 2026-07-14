import { Entity } from "@/core/entities/entity.js";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

interface SaleProps {
    productId: UniqueEntityID;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    profit: number;
    soldAt: Date;
}

export class Sale extends Entity<SaleProps> {

    get productId() {
        return this.props.productId;
    }

    get quantity() {
        return this.props.quantity;
    }

    get unitPrice() {
        return this.props.unitPrice;
    }

    get totalAmount() {
        return this.props.totalAmount;
    }

    get profit() {
        return this.props.profit;
    }

    get soldAt() {
        return this.props.soldAt;
    }

    static create(
        props: SaleProps,
        id?: UniqueEntityID
    ) {
        const sale = new Sale(props, id);
        return sale;
    }
}
