export type TransactionStatus = 'pending' | 'success' | 'failed';
export type TransactionType = 'deposit' | 'withdraw';
export type TransactionNetwork = 'blockchain' | 'internal';
export type TransactionCurrency = 'USD' | 'EU' | 'RUB';
export type ContextStatus = 'init' | 'loading' | 'success' | 'error'
export type Sort = 'ascending' | 'descending';

export interface Transaction {
  id: string,
  type: TransactionType,
  amount: number,
  currency: TransactionCurrency,
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
  createdFrom: string | null,
  createdTo: string | null,
}