"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReceipt = generateReceipt;
// Función para redondear el impuesto a la cantidad más cercana de 0.05
function roundTax(amount) {
    return Math.ceil(amount * 20) / 20;
}
// Función que calcula los impuestos y el precio total para cada producto
function calculatePrice(item) {
    const salesTaxRate = 0.1;
    const importDutyRate = 0.05;
    let price = item.price;
    let salesTax = 0;
    // Verifica si el producto está exento de impuestos
    const isExempt = ["book", "chocolate", "pills"].some((exempt) => item.name.toLowerCase().includes(exempt));
    // Calcula impuesto de ventas si no está exento
    if (!isExempt) {
        salesTax = price * salesTaxRate;
    }
    // Calcula arancel de importación si es importado (usando isImported)
    if (item.isImported) {
        salesTax += price * importDutyRate;
        item.name = `imported ${item.name}`;
    }
    // Redonde el impuesto
    const roundedTax = roundTax(salesTax);
    // Calcula el precio total (precio + impuestos)
    const totalPrice = price + roundedTax;
    return {
        name: item.name,
        price: price,
        totalPrice: totalPrice,
        tax: roundedTax,
    };
}
/**
 * Función para procesar una lista de artículos y generar el recibo
 * @param items
 * @returns string
 */
function generateReceipt(items) {
    let totalTax = 0;
    let totalAmount = 0;
    let receiptItems = [];
    items.forEach((item) => {
        const { name, price, totalPrice, tax } = calculatePrice(item);
        totalTax += tax * item.quantity;
        totalAmount += totalPrice * item.quantity;
        receiptItems.push(`${item.quantity} ${name}: ${(totalPrice * item.quantity).toFixed(2)}`);
    });
    const receipt = receiptItems.join("\n");
    return `${receipt}\nSales Taxes: ${totalTax.toFixed(2)}\nTotal: ${totalAmount.toFixed(2)}`;
}
