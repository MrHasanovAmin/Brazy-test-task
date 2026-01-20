import { Typography } from "antd"
import type { TransactionCurrency, TransactionType } from "../../type"

/*
  В теории можно было бы разместить в shared, но тогда надо было бы создавать shared/types так что в данной реализации тут
*/

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