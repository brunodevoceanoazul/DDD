import { Entity } from "@/core/entities/entity.js";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

interface SupplierProps {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    createdAt: Date;
    updatedAt?: Date;
}

export class Supplier extends Entity<SupplierProps> {

    get name() {
        return this.props.name;
    }

    get email() {
        return this.props.email;
    }

    get phone() {
        return this.props.phone;
    }

    set name(name: string) {
        this.props.name = name;
    }

    set email(email: string) {
        this.props.email = email;
    }

    set phone(phone: string | undefined) {
        this.props.phone = phone;
    }

    set address(address: string | undefined) {
        this.props.address = address;
    }

    touch() {
        this.props.updatedAt = new Date();
    }

    static create(
        props: SupplierProps,
        id?: UniqueEntityID
    ) {
        const supplier = new Supplier(props, id);
        return supplier;
    }
}
