import { Typography } from "antd"
import type { TransactionCurrency, TransactionType } from "../../type"

interface TransactionAmountProps {
  amount: number,
  type: TransactionType,
  currency: TransactionCurrency
}

function TransactionAmount({ amount, type, currency }: TransactionAmountProps) {
  return (
    <Typography.Text type={type === 'deposit' ? 'success' : 'danger'}>
      {`${amount} ${currency}`}
    </Typography.Text>
  )
}

export default TransactionAmount