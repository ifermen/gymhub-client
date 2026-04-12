import type { ReactNode } from "react"

interface PillProps {
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger"
  children: ReactNode
}

export function Pill({ variant = "primary", children }: PillProps) {

  const variants = {
    primary: "to-primary-700 from-primary-800 border-primary-500 text-primary-50",
    secondary: "to-secondary-700 from-secondary-800 border-secondary-500 text-secondary-50",
    accent: "to-accent-700 from-accent-800 border-accent-500 text-accent-50",
    success: "to-success-700 from-success-800 border-success-500 text-success-50",
    warning: "to-warning-700 from-warning-800 border-warning-500 text-warning-50",
    danger: "to-danger-700 from-danger-800 border-danger-500 text-danger-50"
  }

  return (
    <span className={`
      pt-1
      px-2
      h-fit
      rounded-full
      font-bold
      bg-gradient-to-br
      border-3
      text-md
      ${variants[variant]}
    `}>
      {children}
    </span>
  )
}