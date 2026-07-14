import type { Stock } from "@/domain/entities/stock.js";

export interface StockRepository {
    create(stock: Stock): Promise<void>;
    findByProductId(productId: string): Promise<Stock | null>;
    findLowStock(): Promise<Stock[]>;
    save(stock: Stock): Promise<void>;
}
