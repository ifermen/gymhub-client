import type { ReactNode } from "react";

interface DivContentProps {
  children: ReactNode;
}

export function DivContent({ children }: DivContentProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl p-3 sm:w-3/4 sm:border-4 sm:border-text-600 sm:bg-background-950 sm:shadow-md md:w-2/3 lg:w-2/4 xl:w-2/4">
      {children}
    </div>
  );
}
