import type { Supplier } from "@/domain/entities/supplier.js";

export interface SupplierRepository {
    create(supplier: Supplier): Promise<void>;
    findById(id: string): Promise<Supplier | null>;
    findAll(): Promise<Supplier[]>;
    save(supplier: Supplier): Promise<void>;
}
