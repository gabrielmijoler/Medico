import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { TableCell as MuiTableCell } from "@mui/material";

type TProps = {
  className?: string;
  contentClassName?: string;
  children: ReactNode | ReactNode[];
};

export function TableTd({ children, className, contentClassName }: TProps) {
  return (
    <MuiTableCell
      className={twMerge(
        "text-xs font-medium text-multi-text-secondary px-4 py-0",
        className,
      )}
      sx={{ border: 0 }}
    >
      <div className={twMerge("flex min-h-10 items-center", contentClassName)}>
        {children}
      </div>
    </MuiTableCell>
  );
}
