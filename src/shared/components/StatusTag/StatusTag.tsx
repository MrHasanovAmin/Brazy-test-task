import { CheckOutlined, ClockCircleOutlined, CloseOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Tag } from "antd"

type status = 'created' | 'pending' | 'success' | 'failed'

interface StatusTagProps {
  status: status
  children?: React.ReactNode
}

const statusColors: Record<status, string> = {
  pending: "blue",
  success: "green",
  failed: "red",
  created: "cyan",
}

const statusIcons = {
  pending: <ClockCircleOutlined />,
  success: <CheckOutlined />,
  failed: <CloseOutlined />,
  created: <PlusCircleOutlined />,
}

function StatusTag({ status, children }: StatusTagProps) {
  return (
    <Tag variant="outlined" icon={statusIcons[status]} color={statusColors[status]} >
      {children ?? status.toUpperCase()}
    </Tag>
  )
}

export default StatusTag