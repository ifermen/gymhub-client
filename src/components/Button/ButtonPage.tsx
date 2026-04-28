import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode,
  id: string,
  type: 'button' | 'submit',
  variant?: 'primary' | 'secondary' | 'accent' | 'dark' | 'light',
  style?: string
  handleClick: () => void
}
export function ButtonPage({ children, id, type, variant = "primary", style, handleClick }: ButtonProps) {

  const variants = {
    primary: `
    bg-primary-600 border-primary-400
    hover:bg-primary-700 hover:border-primary-500
  `,
    secondary: `
    bg-secondary-600 border-secondary-400
    hover:bg-secondary-700 hover:border-secondary-500
  `,
    accent: `
    bg-accent-600 border-accent-400
    hover:bg-accent-700 hover:border-accent-500
  `,
    dark: `
    bg-background-200 border-background-100
    hover:bg-background-300 hover:border-background-200
    text-text-950
  `,
    light: `
    bg-background-900 border-background-100
    hover:bg-background-950 hover:border-background-200
  `
  }

  return (
    <button
      id={id}
      type={type}
      onClick={handleClick}
      className={`
        w-fit
        pt-1
        px-2
        rounded-xl
        border
        text-base
        sm:text-xl
        font-bold
        ${style}
        ${variants[variant]}
      `}>
      {children}
    </button>
  )
}