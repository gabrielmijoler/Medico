"use client";

import { TableHead, TableRow } from "@mui/material";

import { TableTh } from "./table.th";
import type { TTableColumn } from "./types";

type TProps = {
  columns: TTableColumn[];
};

export function TableColumns({ columns }: TProps) {
  const mappedColumns = columns.map((column) => {
    return (
      <TableTh
        className={column.className}
        column={column}
        key={column.property}
      />
    );
  });

  return (
    <TableHead>
      <TableRow>{mappedColumns}</TableRow>
    </TableHead>
  );
}
