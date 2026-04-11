import type { ReactNode } from "react";

interface DivContentProps {
  children: ReactNode;
}

export function DivContent({ children }: DivContentProps) {
  return <div className="
        flex
        flex-col
        w-full
        sm:w-3/4
        md:w-2/3
        lg:w-2/4
        xl:w-1/3
        p-3
        sm:bg-background-950
        rounded-3xl
        gap-3
        sm:border-4
        justify-center
        items-center
      sm:border-text-600
        sm:shadow-md
      ">{children}</div>
}