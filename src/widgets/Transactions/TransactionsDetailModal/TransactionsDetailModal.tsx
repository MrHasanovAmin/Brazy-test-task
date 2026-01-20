import { Descriptions, Modal } from "antd"
import type { Transaction } from "../../../features/transactions"
import dayjs from "dayjs"
import StatusTag from "../../../shared/components/StatusTag/StatusTag"
import TransactionAmount from "../../../features/transactions/components/TransactionAmount/TransactionAmount"

interface TransactionsDetailModalProps {
  transaction: Transaction | null,
  isOpen: boolean,
  onClose: () => void
}

function TransactionsDetailModal({ transaction, isOpen, onClose }: TransactionsDetailModalProps) {
  if (!transaction) return null

  return (
    <Modal
      title="Transaction Details"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Descriptions bordered column={2} size="small">
        <Descriptions.Item label="ID">{transaction.id}</Descriptions.Item>
        <Descriptions.Item label="Steam Id">{transaction.steamID}</Descriptions.Item>
        <Descriptions.Item label="User id">{transaction.userId}</Descriptions.Item>
        <Descriptions.Item label="Network">{transaction.network}</Descriptions.Item>
        <Descriptions.Item label="Amount">
          <TransactionAmount amount={transaction.amount} type={transaction.type} currency={transaction.currency} />
        </Descriptions.Item>
        <Descriptions.Item label="Status"><StatusTag status={transaction.status} /></Descriptions.Item>
        <Descriptions.Item label="Created">{dayjs(transaction.createdAt).format('DD-MM-YYYY HH:mm')}</Descriptions.Item>
        <Descriptions.Item label="Updated">{dayjs(transaction.updatedAt).format('DD-MM-YYYY HH:mm')}</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default TransactionsDetailModal