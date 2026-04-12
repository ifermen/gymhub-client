import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode,
  id: string,
  type: 'button' | 'submit',
  variant?: 'primary' | 'secondary' | 'accent' | 'dark' | 'light',
  handleClick: () => void
}
export function ButtonPage({ children, id, type, variant = "primary", handleClick }: ButtonProps) {

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
    dark: `
    to-background-100 from-background-200 border-background-100
    hover:to-background-200 hover:from-background-300 hover:border-background-200
    text-text-950
  `,
    light: `
    to-background-800 from-background-900 border-background-100
    hover:to-background-900 hover:from-background-950 hover:border-background-300
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