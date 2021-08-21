export interface CardTransaction {
  id: number;
  vendor: string;
  transactionDate: Date;
  amount: number;
  type?: string;
}
