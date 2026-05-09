import { LineHorizontal } from "../Line/LineHorizontal";
import type { ReactNode } from 'react';

interface SectionHomeProps {
  title: string;
  description: string;
  children: ReactNode;
}
export function SectionHome({ title, description, children }: SectionHomeProps) {
  return (
    <div className="flex flex-col w-full bg-background-950 border border-background-800 rounded-xl">
      <div className="p-3 flex flex-col w-full">
        <h3 className="sm:text-3xl text-xl">{title}</h3>
        <span className="font-bold text-text-500 text-sm">{description}</span>
      </div>
      <LineHorizontal />
      <div className="flex flex-wrap">
        {children}
      </div>
      <LineHorizontal />
      <div className="p-3">
      </div>
    </div>
  )
}