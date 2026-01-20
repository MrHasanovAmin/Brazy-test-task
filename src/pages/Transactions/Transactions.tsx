import { useEffect } from "react"
import { useTransactionsContext } from "../../features/transactions"

function Transactions() {
  const { loadTransactions } = useTransactionsContext()

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <div>transactions</div>
  )
}

export default Transactions