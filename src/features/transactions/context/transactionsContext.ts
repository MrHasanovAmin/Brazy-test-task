import { createContext, useContext } from 'react'
import type { ContextStatus, Transaction } from '../type'

interface TransactionsContextValue {
  transactions: Transaction[]
  status: ContextStatus
  loadTransactions: () => void
  hasFilters: boolean
}


export const TransactionsContext = createContext<TransactionsContextValue | null>(null)

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext)

  if (!context) {
    throw new Error('useTransactionsContext must be used within a TransactionsProvider')
  }

  return context
}