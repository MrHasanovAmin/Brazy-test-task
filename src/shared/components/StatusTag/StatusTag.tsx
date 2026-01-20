import { CheckOutlined, ClockCircleOutlined, CloseOutlined } from "@ant-design/icons"
import { Tag } from "antd"

type status = 'pending' | 'success' | 'failed'

interface StatusTagProps {
  status: status
  children?: React.ReactNode
}

const statusColors: Record<status, string> = {
  pending: "blue",
  success: "green",
  failed: "red",
}

const statusIcons = {
  pending: <ClockCircleOutlined />,
  success: <CheckOutlined />,
  failed: <CloseOutlined />,
}

function StatusTag({ status, children }: StatusTagProps) {
  return (
    <Tag variant="outlined" icon={statusIcons[status]} color={statusColors[status]} >
      {children ?? status.toUpperCase()}
    </Tag>
  )
}

export default StatusTag