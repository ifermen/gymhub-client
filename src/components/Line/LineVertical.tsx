export interface LineProps {
  variant?: "black" | "white";
  style?: string;
}

export function LineVertical({ variant = "black", style = "" }: LineProps) {

  const variants = {
    black: "border-background-50",
    white: "border-background-950"
  }

  return (
    <div className={`border-l self-stretch ${variants[variant]} ${style}`} />
  )
}