import type { Product } from "@/domain/entities/product.js";

export interface ProductRepository {
    create(product: Product): Promise<void>;
    findById(id: string): Promise<Product | null>;
    findBySku(sku: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    save(product: Product): Promise<void>;
}
