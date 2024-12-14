"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sales_1 = require("../sales");
describe("roundTax", () => {
    it("should round up to the nearest 0.05", () => {
        expect((0, sales_1.roundTax)(1.23)).toBe(1.25);
        expect((0, sales_1.roundTax)(2.1)).toBe(2.1);
        expect((0, sales_1.roundTax)(0.52)).toBe(0.55);
        expect((0, sales_1.roundTax)(3.49)).toBe(3.5);
    });
});
describe("calculatePrice", () => {
    it("should calculate price and tax correctly for a non-exempt item", () => {
        const item = {
            name: "book",
            price: 10,
            isImported: false,
            quantity: 1,
        };
        const result = (0, sales_1.calculatePrice)(item);
        expect(result.name).toBe("book");
        expect(result.price).toBe(10);
        expect(result.tax).toBe(0); // 10% tax
        expect(result.totalPrice).toBe(10.0); // price + tax
    });
    it("should calculate price and tax correctly for an imported item", () => {
        const item = {
            name: "perfume",
            price: 50,
            isImported: true,
            quantity: 1,
        };
        const result = (0, sales_1.calculatePrice)(item);
        expect(result.name).toBe("imported perfume");
        expect(result.price).toBe(50);
        expect(result.tax).toBe(7.5); // 10% tax + 5%  tariff
        expect(result.totalPrice).toBe(57.5); // price + taxes + tariff
    });
    it("should not charge sales tax on exempt items", () => {
        const item = {
            name: "chocolate",
            price: 5,
            isImported: false,
            quantity: 1,
        };
        const result = (0, sales_1.calculatePrice)(item);
        expect(result.tax).toBe(0); // There are no taxes for exempt products
        expect(result.totalPrice).toBe(5);
    });
});
