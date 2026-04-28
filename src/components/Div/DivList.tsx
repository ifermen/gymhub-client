import type { ReactNode } from "react"

interface DivListProps {
  children: ReactNode
}

export default function DivList({ children }: DivListProps) {
  return (
    <div className="flex flex-col gap-3 w-full sm:p-7 p-3">{children}</div>
  )
}