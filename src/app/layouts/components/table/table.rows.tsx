import type { ReactElement } from "react";

import { TableBody, TableCell, TableRow } from "@mui/material";

import Ternary from "../ternary";

import { TableTd } from "./table.td";
import type { TFormattedRow, TTableColumn } from "./types";

type TProps<T> = {
  data?: (T & { id: string })[];
  columns: TTableColumn[];
  mapTo: (data: T) => TFormattedRow;
  emptyMessage?: string;
  emptyComponent?: ReactElement;
};

export function TableRows<T>({
  data,
  columns,
  mapTo,
  emptyMessage,
  emptyComponent,
}: TProps<T>) {
  if (!data?.length) {
    return (
      <TableBody className="bg-white">
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Ternary condition={Boolean(emptyComponent)}>
              {emptyComponent}
              <div className="flex w-full justify-center items-center">
                {emptyMessage ?? "Nenhum item para listar"}
              </div>
            </Ternary>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  const mappedRows = data.map((item) => {
    const row = mapTo(item);

    const mappedCells = columns.map((column) => {
      return (
        <TableTd
          contentClassName={row[column.property]?.className}
          key={`row[${item.id}][${column.property}]`}
        >
          {row[column.property]?.content ?? "-"}
        </TableTd>
      );
    });

    return (
      <TableRow
        className="border-b border-multi-neutral-50 last:border-multi-neutral-100"
        key={item.id}
      >
        {mappedCells}
      </TableRow>
    );
  });

  return <TableBody className="bg-white">{mappedRows}</TableBody>;
}
