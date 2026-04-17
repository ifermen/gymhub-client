import type { ReactNode } from "react"

interface DivListProps {
  children: ReactNode
}

export default function DivList({ children }: DivListProps) {
  return (
    <div className="flex w-full flex-col gap-2 py-1">{children}</div>
  )
}