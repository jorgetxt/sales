// Definición de tipos
interface Item {
  name: string;
  quantity: number;
  price: number;
  isImported?: boolean; // Nuevo parámetro
}

interface ReceiptItem {
  name: string;
  price: number;
  totalPrice: number;
  tax: number;
}

// Función para redondear el impuesto a la cantidad más cercana de 0.05
function roundTax(amount: number): number {
  return Math.ceil(amount * 20) / 20;
}

// Función que calcula los impuestos y el precio total para cada producto
function calculatePrice(item: Item): ReceiptItem {
  const salesTaxRate = 0.1;
  const importDutyRate = 0.05;

  let price = item.price;
  let salesTax = 0;

  // Verificar si el producto está exento de impuestos
  const isExempt = ["book", "chocolate", "pills"].some((exempt) =>
    item.name.toLowerCase().includes(exempt)
  );

  // Calcular impuesto de ventas si no está exento
  if (!isExempt) {
    salesTax = price * salesTaxRate;
  }

  // Calcular arancel de importación si es importado (usando isImported)
  if (item.isImported) {
    salesTax += price * importDutyRate;
    item.name = `imported ${item.name}`;
  }

  // Redondear el impuesto
  const roundedTax = roundTax(salesTax);

  // Calcular el precio total (precio + impuestos)
  const totalPrice = price + roundedTax;

  return {
    name: item.name,
    price: price,
    totalPrice: totalPrice,
    tax: roundedTax,
  };
}

// Función para procesar una lista de artículos y generar el recibo
function generateReceipt(items: Item[]): string {
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

// Ejemplos de entrada con el nuevo parámetro 'isImported'

const input1: Item[] = [
  { name: "book", quantity: 2, price: 12.49 },
  { name: "music CD", quantity: 1, price: 14.99 },
  { name: "chocolate bar", quantity: 1, price: 0.85 },
];

const input2: Item[] = [
  { name: "box of chocolates", quantity: 1, price: 10.0, isImported: true },
  { name: "bottle of perfume", quantity: 1, price: 47.5, isImported: true },
];

const input3: Item[] = [
  { name: "bottle of perfume", quantity: 1, price: 27.99, isImported: true },
  { name: "bottle of perfume", quantity: 1, price: 18.99 },
  {
    name: "packet of headache pills",
    quantity: 1,
    price: 9.75,
  },
  { name: "box of chocolates", quantity: 3, price: 11.25, isImported: true },
];

// Generar recibos de ejemplo
console.log("Recibo 1:");
console.log(generateReceipt(input1));

console.log("\nRecibo 2:");
console.log(generateReceipt(input2));

console.log("\nRecibo 3:");
console.log(generateReceipt(input3));
