import type { Sale } from "@/domain/entities/sale.js";

export interface SaleRepository {
    create(sale: Sale): Promise<void>;
    findByProductId(productId: string): Promise<Sale[]>;
    findByPeriod(startDate: Date, endDate: Date): Promise<Sale[]>;
}
