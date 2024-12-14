// Function to round the tax to the nearest 0.05
export function roundTax(amount: number): number {
  return Math.ceil(amount * 20) / 20;
}

// Function that calculates taxes and total price for each product
export function calculatePrice(item: Item): ReceiptItem {
  const salesTaxRate = 0.1;
  const importDutyRate = 0.05;

  let price = item.price;
  let salesTax = 0;

  // Check if the product is tax exempt
  const isExempt = ["book", "chocolate", "pills"].some((exempt) =>
    item.name.toLowerCase().includes(exempt)
  );

  // Check if the product is tax exempt
  if (!isExempt) {
    salesTax = price * salesTaxRate;
  }

  // Calculate import tariff if imported (using isImported)
  if (item.isImported) {
    salesTax += price * importDutyRate;
    item.name = `imported ${item.name}`;
  }

  // Calculate the total price (price + tax)
  const roundedTax = roundTax(salesTax);

  // Calculate the total price (price + tax)
  const totalPrice = price + roundedTax;

  return {
    name: item.name,
    price: price,
    totalPrice: totalPrice,
    tax: roundedTax,
  };
}

/**
 * // Calculate the total price (price + tax)
 * @param items
 * @returns string
 */
export function generateReceipt(items: Item[]): string {
  let totalTax = 0;
  let totalAmount = 0;
  let receiptItems: string[] = [];

  items.forEach((item) => {
    const { name, price, totalPrice, tax } = calculatePrice(item);
    totalTax += tax * item.quantity;
    totalAmount += totalPrice * item.quantity;
    receiptItems.push(
      `${item.quantity} ${name}: ${(totalPrice * item.quantity).toFixed(2)}`
    );
  });

  const receipt = receiptItems.join("\n");
  return `${receipt}\nSales Taxes: ${totalTax.toFixed(
    2
  )}\nTotal: ${totalAmount.toFixed(2)}`;
}
