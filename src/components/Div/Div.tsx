import type { ReactNode } from "react"

interface DivProps {
  children: ReactNode
}

export function Div({ children }: DivProps) {
  return (
    <div className="
      flex
      w-full
      h-full
      lg:h-fit
      lg:my-1
      flex-col
      items-center
      justify-center
      lg:rounded-3xl
      lg:border
      lg:border-background-800
      bg-white
      lg:shadow-md
      lg:w-3/4
      xl:w-2/3
      2xl:w-2/4">
      {children}
    </div>
  )
}