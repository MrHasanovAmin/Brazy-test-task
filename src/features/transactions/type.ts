export type TransactionStatus = 'pending' | 'success' | 'failed';
export type TransactionType = 'deposit' | 'withdrawal';
export type TransactionNetwork = 'blockchain' | 'bank' | 'paypal';
export type Currency = 'USD' | 'EU' | 'RUB';
export type ContextStatus = 'init' | 'loading' | 'success' | 'error'
export type Sort = 'ascending' | 'descending';

export interface Transaction {
  id: string,
  type: TransactionType,
  amount: number,
  currency: Currency,
  status: TransactionStatus,
  steamID: string,
  createdAt: string,
  updatedAt: string,
  fee: number,
  network: TransactionNetwork,
  userId: string,
}

export interface TransactionsParams {
  id: string | null,
  type: TransactionType | null,
  status: TransactionStatus | null,
  createdAt: string | null,
}