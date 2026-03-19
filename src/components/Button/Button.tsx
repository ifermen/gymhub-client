import type { ReactNode } from "react"

interface ButtonProps {
  children:ReactNode,
  id:string,
  type:'button'|'submit',
  variant?: 'primary' | 'secondary',
  handleClick:() => void
}
export function Button({children,id,type,variant = "primary",handleClick}:ButtonProps){

  const variants = {
  primary: `
    to-primary-500 from-primary-600 border-primary-500
    hover:to-primary-600 hover:from-primary-700 hover:border-primary-600
  `,
  secondary: `
    to-secondary-500 from-secondary-600 border-secondary-500
    hover:to-secondary-600 hover:from-secondary-700 hover:border-secondary-600
  `
}

  return (
    <button
      id={id}
      type={type}
      onClick={handleClick}
      className={`
        w-full
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