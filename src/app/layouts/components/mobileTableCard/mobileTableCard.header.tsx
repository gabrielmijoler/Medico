import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TProps = {
  children: ReactNode | ReactNode[];
  className?: string;
};

export function MobileTableCardHeader({ children, className }: TProps) {
  return (
    <div
      className={twMerge(
        `flex items-center justify-between pb-4 border-b border-multi-neutral-100 
        text-multi-neutral-950 text-sm font-medium`,
        className,
      )}
    >
      {children}
    </div>
  );
}
