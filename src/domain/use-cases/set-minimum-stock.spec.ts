import { expect, test, describe } from "vitest";
import type { StockRepository } from "@/domain/repositories/stock-repository.js";
import type { ProductRepository } from "@/domain/repositories/product-repository.js";
import { SetMinimumStockUseCase } from "./set-minimum-stock.js";
import type { Stock } from "@/domain/entities/stock.js";
import { Product } from "@/domain/entities/product.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

const productId = new UniqueEntityID('product-1');

const fakeProductRepository: ProductRepository = {
    create: async () => {},
    findById: async (id: string) => {
        return Product.create({
            name: 'Test Product',
            description: 'Test',
            sku: 'TEST-001',
            createdAt: new Date(),
        }, productId);
    },
    findBySku: async () => null,
    findAll: async () => [],
    save: async () => {},
};

const fakeStockRepository: StockRepository = {
    create: async () => {},
    findByProductId: async () => null,
    findLowStock: async () => [],
    save: async () => {},
};

describe('Set Minimum Stock Use Case', () => {
    test('should be able to set minimum stock for a product', async () => {
        const setMinimumStock = new SetMinimumStockUseCase(
            fakeStockRepository,
            fakeProductRepository
        );

        const { stock } = await setMinimumStock.execute({
            productId: 'product-1',
            minimumQuantity: 10,
        });

        expect(stock.minimumQuantity).toEqual(10);
    });
});
