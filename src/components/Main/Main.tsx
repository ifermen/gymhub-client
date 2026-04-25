import type { ReactNode } from "react"

interface MainProps {
  children: ReactNode
}

export function Main({ children }: MainProps) {
  return (
    <main className="
      py-3
      flex
      flex-col
      items-center
      bg-background-950
      sm:justify-center
    ">{children}</main>
  )
}