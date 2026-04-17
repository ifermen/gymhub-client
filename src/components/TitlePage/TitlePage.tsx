import type { ReactNode } from "react"

interface TitlePageProps {
  children: ReactNode
}

export function TitlePage({ children }: TitlePageProps) {
  return (
    <h2 className="
      text-center
      text-4xl
      sm:text-6xl
      text-text-100
      font-extrabold
    ">{children}</h2>
  )
}