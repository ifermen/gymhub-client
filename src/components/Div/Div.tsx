import type { ReactNode } from "react"

interface DivProps {
  children: ReactNode
}

export function Div({ children }: DivProps) {
  return (
    <div className="w-full lg:w-2/3 xl:w-2/4 p-1">{children}</div>
  )
}