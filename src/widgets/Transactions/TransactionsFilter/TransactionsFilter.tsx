import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { AutoComplete, Button, DatePicker, Flex, Select } from "antd"
import dayjs from "dayjs";
import Collapsed from "../../../shared/components/Collapse/Collapse"
import { useTransactionsContext, type TransactionStatus, type TransactionType } from "../../../features/transactions";
import type { TransactionsParams } from "../../../features/transactions/type";
import { useDebounce } from "../../../shared/hooks/useDebounce";

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
]

const initialFilters: Record<keyof TransactionsParams, string> = {
  id: '',
  type: 'all',
  status: 'all',
  createdFrom: '',
  createdTo: '',
}

function TransactionsFilter() {
  const { transactionsIds } = useTransactionsContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id") ?? initialFilters.id;
  const [localId, setLocalId] = useState(id)
  const debouncedId = useDebounce(localId, 500)

  const type = (searchParams.get("type") ?? initialFilters.type) as TransactionTypeValue;
  const status = (searchParams.get("status") ?? initialFilters.status) as TransactionStatusValue;
  const from = searchParams.get("createdFrom") ?? initialFilters.createdFrom;
  const to = searchParams.get("createdTo") ?? initialFilters.createdTo;

  const idOptions =
    transactionsIds
      .filter(transactionId => transactionId.toLowerCase().includes(localId.toLowerCase()))
      .map((id => ({ value: id })))


  const handleParamsChange: <T extends string>(arg: T, key: keyof TransactionsParams) => void = (value, key) => {
    setSearchParams((prevParams) => {
      if (value !== 'all' && value !== "") {
        prevParams.set(key, value)
      } else {
        prevParams.delete(key)
      }

      return prevParams
    })
  }

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

  useEffect(() => {
    if (localId !== id) {
      handleParamsChange(debouncedId, "id")
    }
  }, [debouncedId])

  return (
    <Collapsed label="Filter">
      <Flex justify="space-between">
        <Flex gap="8px" align="center">
          <Select<TransactionTypeValue>
            value={type}
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
            value={status}
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
            onSelect={(value) => setLocalId(value)}
            onChange={(value) => setLocalId(value)}
            placeholder="Transaction ID"
          />
        </Flex>
        <Flex gap="8px">
          <DatePicker.RangePicker
            value={from && to ? [dayjs(from), dayjs(to)] : null}
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