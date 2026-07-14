import { Entity } from "@/core/entities/entity.js";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

interface StockProps {
    productId: UniqueEntityID;
    quantity: number;
    minimumQuantity: number;
    updatedAt: Date;
}

export class Stock extends Entity<StockProps> {

    get productId() {
        return this.props.productId;
    }

    get quantity() {
        return this.props.quantity;
    }

    get minimumQuantity() {
        return this.props.minimumQuantity;
    }

    set quantity(quantity: number) {
        if (quantity < 0) {
            throw new Error('Stock quantity cannot be negative');
        }
        this.props.quantity = quantity;
        this.props.updatedAt = new Date();
    }

    set minimumQuantity(minimumQuantity: number) {
        if (minimumQuantity < 0) {
            throw new Error('Minimum quantity cannot be negative');
        }
        this.props.minimumQuantity = minimumQuantity;
    }

    isLowStock() {
        return this.props.quantity <= this.props.minimumQuantity;
    }

    decreaseQuantity(amount: number) {
        if (amount > this.props.quantity) {
            throw new Error('Insufficient stock quantity');
        }
        this.quantity = this.props.quantity - amount;
    }

    increaseQuantity(amount: number) {
        this.quantity = this.props.quantity + amount;
    }

    static create(
        props: StockProps,
        id?: UniqueEntityID
    ) {
        const stock = new Stock(props, id);
        return stock;
    }
}
