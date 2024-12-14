interface Item {
  name: string;
  quantity: number;
  price: number;
  isImported?: boolean;
}

interface ReceiptItem {
  name: string;
  price: number;
  totalPrice: number;
  tax: number;
}
