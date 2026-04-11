export interface LineProps {
  variant?: "black" | "white"
}

export function LineVertical({ variant = "black" }: LineProps) {

  const variants = {
    black: "border-background-50",
    white: "border-background-950"
  }

  return (
    <div className={`border-l self-stretch ${variants[variant]}`} />
  )
}