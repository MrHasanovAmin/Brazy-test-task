import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { AutoComplete, Button, DatePicker, Flex, Select } from "antd"
import dayjs from "dayjs";
import Collapsed from "../../../shared/components/Collapse/Collapse"
import { useTransactionsContext, type TransactionStatus, type TransactionType } from "../../../features/transactions";
import type { TransactionsParams } from "../../../features/transactions/type";
import { debounce } from "../../../shared/components/utils/debounce";

const today = dayjs();

type TransactionTypeValue = TransactionType | 'all';
type TransactionStatusValue = TransactionStatus | 'all';

const TransactionsType: { label: string; value: TransactionTypeValue }[] = [
  { label: "All", value: 'all' },
  { label: "Deposit", value: "deposit" },
  { label: "Withdraw", value: "withdraw" },
]

const TransactionsStatus: { label: string; value: TransactionStatusValue }[] = [
  { label: "All", value: 'all' },
  { label: "Failed", value: "failed" },
  { label: "Pending", value: "pending" },
  { label: "Success", value: "success" },
  { label: "Created", value: "created" },
]

const initialFilters: Record<keyof TransactionsParams, string> = {
  id: '',
  type: 'all',
  status: 'all',
  createdFrom: '',
  createdTo: '',
}

function TransactionsFilter() {
  const { transactions } = useTransactionsContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryId = searchParams.get("id") ?? initialFilters.id;
  const [localId, setLocalId] = useState(queryId)

  const queryType = (searchParams.get("type") ?? initialFilters.type) as TransactionTypeValue;
  const queryStatus = (searchParams.get("status") ?? initialFilters.status) as TransactionStatusValue;
  const queryFromDate = searchParams.get("createdFrom") ?? initialFilters.createdFrom;
  const queryToDate = searchParams.get("createdTo") ?? initialFilters.createdTo;

  const idOptions =
    transactions
      .filter(({ id: transactionId }) => transactionId.toLowerCase().includes(localId.toLowerCase()))
      .map(({ id }) => ({ value: id }))

  const handleParamsChange: <T extends string>(arg: T, key: keyof TransactionsParams) => void = useCallback((value, key) => {
    setSearchParams((prevParams) => {
      if (prevParams.get(key) === value) {
        return prevParams
      }

      if (value !== 'all' && value !== "") {
        prevParams.set(key, value)
      } else {
        prevParams.delete(key)
      }

      return prevParams
    })
  }, [setSearchParams])

  const debauncedHandleParamsChange = useMemo(() => debounce(handleParamsChange, 500), [handleParamsChange]);

  const handleDateParamsChange = (date: [string, string] | null) => {
    setSearchParams((prevParams) => {
      if (date) {
        prevParams.set("createdFrom", date[0])
        prevParams.set("createdTo", date[1])
      } else {
        prevParams.delete("createdFrom")
        prevParams.delete("createdTo")
      }

      return prevParams
    })
  }

  const handleParamsReset = () => {
    setLocalId('')
    setSearchParams({})
  }

  return (
    <Collapsed label="Filter">
      <Flex justify="space-between">
        <Flex gap="8px" align="center">
          <Select<TransactionTypeValue>
            value={queryType}
            onChange={(value) => handleParamsChange<TransactionTypeValue>(value, "type")}
            style={{ width: 110 }}
          >
            {TransactionsType.map(({ value, label }) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
          <Select<TransactionStatusValue>
            value={queryStatus}
            onChange={(value) => handleParamsChange<TransactionStatusValue>(value, "status")}
            style={{ width: 100 }}
          >
            {TransactionsStatus.map(({ value, label }) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
          <AutoComplete
            value={localId}
            options={idOptions}
            style={{ width: 120 }}
            onSelect={(value) => {
              setLocalId(value)
              debauncedHandleParamsChange(value, "id")
            }}
            onChange={(value) => {
              setLocalId(value)
              debauncedHandleParamsChange(value, "id")
            }}
            placeholder="Transaction ID"
          />
        </Flex>
        <Flex gap="8px">
          <DatePicker.RangePicker
            value={queryFromDate && queryToDate ? [dayjs(queryFromDate), dayjs(queryToDate)] : null}
            disabledDate={(current) => current && current > today.endOf('day')}
            onChange={(_, dates) => { handleDateParamsChange(dates) }}
          />
          <Button onClick={handleParamsReset}>Reset</Button>
        </Flex>
      </Flex>
    </Collapsed>
  )
}

export default TransactionsFilter