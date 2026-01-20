import { useEffect } from "react"
import { useTransactionsContext } from "../../features/transactions"
import TransactionsTable from "../../widgets/Transactions/TransactionsTable/TransactionsTable"
import TransactionsFilter from "../../widgets/Transactions/TransactionsFilter/TransactionsFilter"

import styles from './Transactions.module.scss'

function Transactions() {
  const { loadTransactions } = useTransactionsContext()

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <div className={styles.component}>
      <TransactionsFilter />
      <TransactionsTable />
    </div>
  )
}

export default Transactions