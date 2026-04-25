import type { ReactNode } from "react"

interface PillProps {
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  width?: "full" | "fit";
  children: ReactNode;
}

export function Pill({ variant = "primary", width = "fit", children }: PillProps) {

  const variants = {
    primary: "bg-primary-900 border-primary-500 text-primary-400",
    secondary: "bg-secondary-900 border-secondary-500 text-secondary-400",
    accent: "bg-accent-900 border-accent-500 text-accent-400",
    success: "bg-success-900 border-success-500 text-success-400",
    warning: "bg-warning-900 border-warning-500 text-warning-400",
    danger: "bg-danger-900 border-danger-500 text-danger-400"
  }

  return (
    <span className={`
      pt-1
      px-3
      h-fit
      rounded-full
      font-bold
      border
      sm:text-base
      text-sm
      w-${width}
      ${variants[variant]}
    `}>
      {children}
    </span>
  )
}