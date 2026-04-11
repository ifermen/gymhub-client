export interface LineProps {
  variant?: "black" | "white"
}

export function LineHorizontal({ variant = "black" }: LineProps) {

  const variants = {
    black: "border-background-50",
    white: "border-background-950"
  }

  return (
    <hr className={`border-t w-full ${variants[variant]}`} />
  )
}