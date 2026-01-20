import { Button, Empty, Flex, Result, Spin, Table, Tag, Typography } from "antd"
import { useTransactionsContext, type Transaction, type TransactionNetwork, type TransactionStatus } from "../../../features/transactions"
import dayjs from "dayjs"
import { CheckOutlined, ClockCircleOutlined, CloseOutlined } from "@ant-design/icons"

const networkColors: Record<TransactionNetwork, string> = {
  blockchain: "orange",
  internal: 'blue'
}

const statusColors: Record<TransactionStatus, string> = {
  pending: "blue",
  success: "green",
  failed: "red",
}

const statusIcons = {
  pending: <ClockCircleOutlined />,
  success: <CheckOutlined />,
  failed: <CloseOutlined />,
}

function TransactionsTable() {
  const { transactions, status, hasFilters, loadTransactions } = useTransactionsContext()

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
    <Table
      dataSource={transactions}
      rowKey="id"
      size="middle"
      pagination={{ pageSize: 10, position: ['bottomCenter'], }}
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
          <Typography.Text type={record.type === 'deposit' ? 'success' : 'danger'}>
            {`${amount} ${record.currency}`}
          </Typography.Text>
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
          <>
            <Tag variant="outlined" icon={statusIcons[status]} color={statusColors[status]} >
              {status.toUpperCase()}
            </Tag>
          </>
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
  )
}

export default TransactionsTable