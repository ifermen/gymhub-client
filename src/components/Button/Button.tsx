import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode,
  id: string,
  type: 'button' | 'submit',
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger',
  width?: 'full' | 'fit'
  handleClick: () => void
}
export function Button({ children, id, type, variant = "primary", width = "full", handleClick }: ButtonProps) {

  const variants = {
    primary: `
    to-primary-500 from-primary-600 border-primary-500
    hover:to-primary-600 hover:from-primary-700 hover:border-primary-600
  `,
    secondary: `
    to-secondary-500 from-secondary-600 border-secondary-500
    hover:to-secondary-600 hover:from-secondary-700 hover:border-secondary-600
  `,
    accent: `
    to-accent-500 from-accent-600 border-accent-500
    hover:to-accent-600 hover:from-accent-700 hover:border-accent-600
  `,
    success: `
    to-success-500 from-success-600 border-success-500
    hover:to-success-600 hover:from-success-700 hover:border-success-600
  `,
    warning: `
    to-warning-500 from-warning-600 border-warning-500
    hover:to-warning-600 hover:from-warning-700 hover:border-warning-600
  `,
    danger: `
    to-danger-500 from-danger-600 border-danger-500
    hover:to-danger-600 hover:from-danger-700 hover:border-danger-600
  `
  }

  return (
    <button
      id={id}
      type={type}
      onClick={handleClick}
      className={`
        w-${width}
        px-3
        pt-1
        rounded-full
        border-3
        text-xl
        font-bold
        bg-gradient-to-br
        ${variants[variant]}
      `}>
      {children}
    </button>
  )
}