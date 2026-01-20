import { Button, Empty, Flex, Result, Spin, Table, Tag, Typography } from "antd"
import dayjs from "dayjs"
import { useState } from "react"
import { useTransactionsContext, type Transaction, type TransactionNetwork, type TransactionStatus } from "../../../features/transactions"
import TransactionsDetailModal from "../TransactionsDetailModal/TransactionsDetailModal"
import StatusTag from "../../../shared/components/StatusTag/StatusTag"
import TransactionAmount from "../../../features/transactions/components/TransactionAmount/TransactionAmount"

const networkColors: Record<TransactionNetwork, string> = {
  blockchain: "orange",
  internal: 'blue'
}

function TransactionsTable() {
  const { transactions, status, hasFilters, loadTransactions } = useTransactionsContext()
  const [modalTransaction, setModalTransaction] = useState<Transaction | null>(null)

  if (status === "loading") {
    return (
      <Flex justify="center" align="center">
        <Spin size="large" />
      </Flex>
    )
  }

  if (transactions.length === 0 && status === "success") {
    return (
      <Flex justify="center" align="center">
        <Empty
          description={hasFilters ? "No transactions match the filters" : "No transactions available"}
        />
      </Flex>
    )
  }

  if (status === "error") {
    return (
      <Flex justify="center" align="center">
        <Result
          status="error"
          title="Failed to load transactions"
          extra={[
            <Button type="primary" key="reload" onClick={loadTransactions}>Retry</Button>
          ]}
        />
      </Flex>
    )
  }

  return (
    <>
      <Table
        dataSource={transactions}
        rowKey="id"
        size="middle"
        pagination={{ pageSize: 10, placement: ['bottomCenter'], }}
        onRow={(record: Transaction) => ({
          onClick: () => {
            setModalTransaction(record)
          },
          style: { cursor: 'pointer' }
        })}
      >
        <Table.Column
          title="ID" dataIndex="id" key="id"
          render={(id) => <Typography.Text copyable code>{id}</Typography.Text>}
          width='100px'
        />
        <Table.Column
          title="User ID" dataIndex="userId" key="userId"
          render={(userId) => <Typography.Text copyable code>{userId}</Typography.Text>}
          width='110px'
        />
        <Table.Column
          title="Steam ID" dataIndex="steamID" key="steamId"
          render={(steamId) => <Typography.Text copyable code>{steamId}</Typography.Text>}
          width='170px'
        />
        <Table.Column
          title="Amount" dataIndex="amount" key="amount"
          sorter={(a: Transaction, b: Transaction) => a.amount - b.amount}
          render={(amount, record: Transaction) => (
            <TransactionAmount amount={amount} type={record.type} currency={record.currency} />
          )}
          width='100px'
        />
        <Table.Column
          title="Fee" dataIndex="fee" key="fee"
          render={(fee, record: Transaction) => (
            <Typography.Text code>
              {`${fee} ${record.currency}`}
            </Typography.Text>
          )}
        />
        <Table.Column
          title="Status" dataIndex="status" key="status"
          render={(status: TransactionStatus) => (
            <StatusTag status={status} />
          )}
          width='100px'
        />
        <Table.Column
          title="Network" dataIndex="network" key="network"
          render={(network: TransactionNetwork) =>
            <Tag color={networkColors[network]} variant="outlined">{network}</Tag>
          }
          width='120px'
        />
        <Table.Column
          title="Created" dataIndex="createdAt" key="createdAt"
          render={(date) => <Typography.Text code>{dayjs(date).format('DD/MM/YYYY')}</Typography.Text>}
          sorter={(a: Transaction, b: Transaction) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix()}
          width='120px'
        />
        <Table.Column
          title="Updated" dataIndex="updatedAt" key="updatedAt"
          render={(date) => <Typography.Text code>{dayjs(date).format('DD/MM/YYYY')}</Typography.Text>}
          sorter={(a: Transaction, b: Transaction) => dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix()}
          width='120px'
        />
      </Table>
      <TransactionsDetailModal
        transaction={modalTransaction!}
        isOpen={!!modalTransaction}
        onClose={() => setModalTransaction(null)}
      />
    </>
  )
}

export default TransactionsTable