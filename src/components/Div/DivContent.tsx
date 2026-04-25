import type { ReactNode } from "react";

interface DivContentProps {
  children: ReactNode;
}

export default function DivContent({ children }: DivContentProps) {
  return (
    <div className="
      flex
      w-full
      h-full
      sm:h-fit
      my-1
      flex-col
      items-center
      justify-center
      sm:rounded-3xl
      sm:w-3/4
      sm:border
      sm:border-background-800
      bg-white
      sm:shadow-md
      md:w-2/3
      lg:w-2/4
      xl:w-2/4">
      {children}
    </div>
  );
}
