import { Product } from "@/domain/entities/product.js";
import type { ProductRepository } from "@/domain/repositories/product-repository.js";

interface RegisterProductRequest {
    name: string;
    description: string;
    sku: string;
    size?: string;
    color?: string;
}

interface RegisterProductResponse {
    product: Product;
}

export class RegisterProductUseCase {
    constructor(
        private productRepository: ProductRepository
    ) {}

    async execute({ name, description, sku, size, color }: RegisterProductRequest): Promise<RegisterProductResponse> {
        const existingProduct = await this.productRepository.findBySku(sku);

        if (existingProduct) {
            throw new Error('Product with this SKU already exists');
        }

        const product = Product.create({
            name,
            description,
            sku,
            size,
            color,
            createdAt: new Date(),
        });

        await this.productRepository.create(product);

        return { product };
    }
}
