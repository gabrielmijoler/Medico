import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TProps = {
  children: ReactNode | ReactNode[];
  className?: string;
};

export function MobileTableCardFooter({ children, className }: TProps) {
  return (
    <div
      className={twMerge("flex items-center justify-between pt-2", className)}
    >
      {children}
    </div>
  );
}
