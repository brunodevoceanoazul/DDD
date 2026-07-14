import { Entity } from "@/core/entities/entity.js";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

interface ProductProps {
    name: string;
    description: string;
    size?: string;
    color?: string;
    sku: string;
    createdAt: Date;
    updatedAt?: Date;
}

export class Product extends Entity<ProductProps> {

    get name() {
        return this.props.name;
    }

    get sku() {
        return this.props.sku;
    }

    get size() {
        return this.props.size;
    }

    get color() {
        return this.props.color;
    }

    set name(name: string) {
        this.props.name = name;
    }

    set description(description: string) {
        this.props.description = description;
    }

    set size(size: string | undefined) {
        this.props.size = size;
    }

    set color(color: string | undefined) {
        this.props.color = color;
    }

    touch() {
        this.props.updatedAt = new Date();
    }

    static create(
        props: ProductProps,
        id?: UniqueEntityID
    ) {
        const product = new Product(props, id);
        return product;
    }
}
