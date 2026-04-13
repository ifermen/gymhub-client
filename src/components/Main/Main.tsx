import type { ReactNode } from "react"

interface MainProps {
  children: ReactNode
}

export function Main({ children }: MainProps) {
  return (
    <main className="
      my-3
      flex
      flex-col
      items-center
      sm:justify-center
    ">{children}</main>
  )
}