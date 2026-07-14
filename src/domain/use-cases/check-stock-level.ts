import type { Stock } from "@/domain/entities/stock.js";
import type { StockRepository } from "@/domain/repositories/stock-repository.js";
import type { ProductRepository } from "@/domain/repositories/product-repository.js";

interface CheckStockLevelRequest {
    productId: string;
}

interface CheckStockLevelResponse {
    stock: Stock;
    isLowStock: boolean;
}

export class CheckStockLevelUseCase {
    constructor(
        private stockRepository: StockRepository,
        private productRepository: ProductRepository
    ) {}

    async execute({ productId }: CheckStockLevelRequest): Promise<CheckStockLevelResponse> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        const stock = await this.stockRepository.findByProductId(productId);

        if (!stock) {
            throw new Error('Stock not found for this product');
        }

        return {
            stock,
            isLowStock: stock.isLowStock(),
        };
    }
}
