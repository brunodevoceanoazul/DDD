import { Stock } from "@/domain/entities/stock.js";
import type { StockRepository } from "@/domain/repositories/stock-repository.js";
import type { ProductRepository } from "@/domain/repositories/product-repository.js";

interface SetMinimumStockRequest {
    productId: string;
    minimumQuantity: number;
}

interface SetMinimumStockResponse {
    stock: Stock;
}

export class SetMinimumStockUseCase {
    constructor(
        private stockRepository: StockRepository,
        private productRepository: ProductRepository
    ) {}

    async execute({ productId, minimumQuantity }: SetMinimumStockRequest): Promise<SetMinimumStockResponse> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        let stock = await this.stockRepository.findByProductId(productId);

        if (!stock) {
            stock = Stock.create({
                productId: product.id,
                quantity: 0,
                minimumQuantity,
                updatedAt: new Date(),
            });
            await this.stockRepository.create(stock);
        } else {
            stock.minimumQuantity = minimumQuantity;
            await this.stockRepository.save(stock);
        }

        return { stock };
    }
}
