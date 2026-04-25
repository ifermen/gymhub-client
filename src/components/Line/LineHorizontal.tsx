export interface LineProps {
  variant?: "black" | "white" | "grey";
  style?: string;
}

export function LineHorizontal({ variant = "black", style = "" }: LineProps) {

  const variants = {
    black: "border-background-50",
    white: "border-background-950",
    grey: "border-background-800",
  }

  return (
    <hr className={`border-t w-full ${variants[variant]} ${style}`} />
  )
}