import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Table as MuiTable, TableContainer } from "@mui/material";

import { TableColumns } from "./table.columns";
import { TablePagination } from "./table.pagination";
import { TableRows } from "./table.rows";
import { TableTd } from "./table.td";
import { TableTh } from "./table.th";

type TProps = {
  children: ReactNode | ReactNode[];
  className?: string;
};

export default function Table({ children, className }: TProps) {
  return (
    <TableContainer
      className={twMerge(
        "rounded-lg border border-multi-neutral-100",
        className,
      )}
    >
      <MuiTable className="rounded-lg">{children}</MuiTable>
    </TableContainer>
  );
}

Table.Columns = TableColumns;
Table.Rows = TableRows;
Table.Pagination = TablePagination;
Table.Td = TableTd;
Table.Th = TableTh;
