import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavOptionProps {
  option: string;
  children: ReactNode
}

export function NavOption({ option, children }: NavOptionProps) {

  const navegate = useNavigate();
  const location = useLocation().pathname.split("/")[1];

  const clickHandler = () => {
    navegate("/" + option)
  }

  return (
    <div
      className={`p-2 border-b-4 w-full flex justify-center cursor-pointer ${location == option
        ? "border-b-primary-500 font-bold"
        : "border-b-transparent hover:border-b-background-800 hover:bg-gradient-to-br hover:to-background-300 hover:from-background-400"
        }`}
      onClick={clickHandler}
    >
      <span className="text-center sm:text-xl">{children}</span>
    </div>
  )
}