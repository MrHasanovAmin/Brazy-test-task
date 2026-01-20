import { useCallback, useMemo, useState, type ReactNode } from "react"
import type { ContextStatus, Transaction, TransactionStatus, TransactionType } from "../type"
import { fetchTransactions } from "../../../api"
import { TransactionsContext } from "./transactionsContext"
import { useSearchParams } from "react-router-dom"
import dayjs from "dayjs"

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [status, setStatus] = useState<ContextStatus>('init')
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id')
  const type = searchParams.get('type') as TransactionType | null
  const statusParam = searchParams.get('status') as TransactionStatus | null
  const createdFrom = searchParams.get('createdFrom')
  const createdTo = searchParams.get('createdTo')
  const hasFilters = !!(id || type || statusParam || createdFrom || createdTo)

  const transactionsIds = useMemo(() => {
    return transactions.map(transaction => transaction.id)
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    if (hasFilters) {
      return (
        transactions.filter(transaction => (
          (id ? transaction.id.toLowerCase().includes(id.toLowerCase()) : true) &&
          (type ? transaction.type === type : true) &&
          (statusParam ? transaction.status === statusParam : true) &&
          (createdFrom ? dayjs(transaction.createdAt).isAfter(dayjs(createdFrom)) : true) &&
          (createdTo ? dayjs(transaction.createdAt).isBefore(dayjs(createdTo)) : true)
        ))
      )
    }
    return transactions

  }, [id, type, statusParam, createdFrom, createdTo, transactions, hasFilters])

  const loadTransactions = useCallback(
    async () => {
      setStatus('loading')

      try {
        const data = await fetchTransactions()
        setTransactions(data as Transaction[])
        setStatus('success')
      } catch {
        setStatus('error')
      }
    }, []
  )

  return (
    <TransactionsContext.Provider value={{
      transactions: filteredTransactions, status, loadTransactions, hasFilters, transactionsIds
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}
