import { expect, test, describe } from "vitest";
import { Stock } from "@/domain/entities/stock.js";
import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";

describe('Stock Entity', () => {
    test('should detect low stock when quantity is below minimum', () => {
        const productId = new UniqueEntityID('product-1');

        const stock = Stock.create({
            productId,
            quantity: 5,
            minimumQuantity: 10,
            updatedAt: new Date(),
        });

        expect(stock.isLowStock()).toBe(true);
    });

    test('should not detect low stock when quantity is above minimum', () => {
        const productId = new UniqueEntityID('product-1');

        const stock = Stock.create({
            productId,
            quantity: 15,
            minimumQuantity: 10,
            updatedAt: new Date(),
        });

        expect(stock.isLowStock()).toBe(false);
    });

    test('should detect low stock when quantity equals minimum', () => {
        const productId = new UniqueEntityID('product-1');

        const stock = Stock.create({
            productId,
            quantity: 10,
            minimumQuantity: 10,
            updatedAt: new Date(),
        });

        expect(stock.isLowStock()).toBe(true);
    });

    test('should throw error when decreasing more than available', () => {
        const productId = new UniqueEntityID('product-1');

        const stock = Stock.create({
            productId,
            quantity: 5,
            minimumQuantity: 10,
            updatedAt: new Date(),
        });

        expect(() => stock.decreaseQuantity(10)).toThrow('Insufficient stock quantity');
    });

    test('should increase quantity correctly', () => {
        const productId = new UniqueEntityID('product-1');

        const stock = Stock.create({
            productId,
            quantity: 5,
            minimumQuantity: 10,
            updatedAt: new Date(),
        });

        stock.increaseQuantity(10);
        expect(stock.quantity).toBe(15);
    });
});
