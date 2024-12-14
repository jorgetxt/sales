"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sales_1 = require("./sales");
const input1 = [
    { name: "book", quantity: 2, price: 12.49 },
    { name: "music CD", quantity: 1, price: 14.99 },
    { name: "chocolate bar", quantity: 1, price: 0.85 },
];
const input2 = [
    { name: "box of chocolates", quantity: 1, price: 10.0, isImported: true },
    { name: "bottle of perfume", quantity: 1, price: 47.5, isImported: true },
];
const input3 = [
    { name: "bottle of perfume", quantity: 1, price: 27.99, isImported: true },
    { name: "bottle of perfume", quantity: 1, price: 18.99 },
    {
        name: "packet of headache pills",
        quantity: 1,
        price: 9.75,
    },
    { name: "box of chocolates", quantity: 3, price: 11.25, isImported: true },
];
const inputs = [input1, input2, input3];
inputs.forEach((input, index) => {
    console.log(`Bill ${index + 1}:`);
    console.log((0, sales_1.generateReceipt)(input), "\n");
});
