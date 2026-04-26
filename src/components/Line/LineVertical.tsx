export interface LineProps {
  variant?: "black" | "white" | "grey";
  style?: string;
}

export function LineVertical({ variant = "grey", style = "" }: LineProps) {

  const variants = {
    black: "border-background-50",
    white: "border-background-950",
    grey: "border-background-800",
  }

  return (
    <div className={`border-l self-stretch ${variants[variant]} ${style}`} />
  )
}