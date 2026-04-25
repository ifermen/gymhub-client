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
    bg-primary-600 border-primary-400 text-primary-100
    hover:bg-primary-700 hover:border-primary-500 hover:text-primary-300
  `,
    secondary: `
    bg-secondary-600 border-secondary-400 text-secondary-100
    hover:bg-secondary-700 hover:border-secondary-500 hover:text-secondary-300
  `,
    accent: `
    bg-accent-600 border-accent-400 text-accent-100
    hover:bg-accent-700 hover:border-accent-500 hover:text-accent-300
  `,
    success: `
    bg-success-600 border-success-400 text-success-100
    hover:bg-success-700 hover:border-success-500 hover:text-success-300
  `,
    warning: `
    bg-warning-600 border-warning-400 text-warning-100
    hover:bg-warning-700 hover:border-warning-500 hover:text-warning-300
  `,
    danger: `
    bg-danger-600 border-danger-400 text-danger-100
    hover:bg-danger-700 hover:border-danger-500 hover:text-danger-300
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
        rounded-xl
        border
        text-xl
        font-bold
        ${variants[variant]}
      `}>
      {children}
    </button>
  )
}