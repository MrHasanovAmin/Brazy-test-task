import { Collapse } from "antd"

/*
  синтаксический сахар чтобы удобнее было использовать Collapse
*/
interface CollapseProps {
  children: React.ReactNode
  label: string
}

function Collapsed({ children, label }: CollapseProps) {
  return (
    <Collapse
      size="small"
      items={[{
        key: label,
        label: label,
        children: children
      }]}
    />
  )
}

export default Collapsed