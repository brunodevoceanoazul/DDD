import { expect, test, describe } from "vitest";
import type { ProductRepository } from "@/domain/repositories/product-repository.js";
import { RegisterProductUseCase } from "./register-product.js";
import type { Product } from "@/domain/entities/product.js";

const fakeProductRepository: ProductRepository = {
    create: async (product: Product) => {},
    findById: async (id: string) => null,
    findBySku: async (sku: string) => null,
    findAll: async () => [],
    save: async (product: Product) => {},
};

describe('Register Product Use Case', () => {
    test('should be able to register a new product', async () => {
        const registerProduct = new RegisterProductUseCase(fakeProductRepository);

        const { product } = await registerProduct.execute({
            name: 'T-Shirt',
            description: 'Cotton t-shirt',
            sku: 'TSHIRT-001',
            size: 'M',
            color: 'Blue',
        });

        expect(product.name).toEqual('T-Shirt');
        expect(product.sku).toEqual('TSHIRT-001');
        expect(product.size).toEqual('M');
        expect(product.color).toEqual('Blue');
    });

    test('should not be able to register a product with duplicate SKU', async () => {
        const repositoryWithProduct: ProductRepository = {
            ...fakeProductRepository,
            findBySku: async (sku: string) => {
                const { Product } = await import('@/domain/entities/product.js');
                return Product.create({
                    name: 'Existing Product',
                    description: 'Existing',
                    sku: 'DUP-001',
                    createdAt: new Date(),
                });
            },
        };

        const registerProduct = new RegisterProductUseCase(repositoryWithProduct);

        await expect(registerProduct.execute({
            name: 'Another Product',
            description: 'Another',
            sku: 'DUP-001',
        })).rejects.toThrow('Product with this SKU already exists');
    });
});
