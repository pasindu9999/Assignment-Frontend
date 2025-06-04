export interface InvoiceItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }
  
  export interface Invoice {
    id: string;
    transactionDate: string;
    discount: number;
    totalAmount: number;
    balanceAmount: number;
    items: InvoiceItem[];
  }
  
  export interface InvoiceRequest {
    transactionDate: string;
    discount: number;
    products: InvoiceItem[];
  }