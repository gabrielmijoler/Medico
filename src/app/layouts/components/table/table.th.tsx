"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { ExpandLess, ExpandMore, UnfoldMore } from "@mui/icons-material";
import { Box, ButtonBase, TableCell as MuiTableCell } from "@mui/material";

import If from "../if";

import type { TTableColumn } from "./types";

type TProps = {
  className?: string;
  contentClassName?: string;
  column: TTableColumn;
};

const sortQuery = "sort";
const orderQuery = "order";

type TSort = {
  sort: string | null;
  order: string | null;
  column: TTableColumn;
};

const SortIcon = ({ sort, order, column }: TSort) => {
  if (sort === column.property) {
    if (order === "ASC") return <ExpandLess className="w-[18px] h-[18px]" />;

    if (order === "DESC") return <ExpandMore className="w-[18px] h-[18px]" />;
  }

  return <UnfoldMore className="w-[18px] h-[18px]" />;
};

export function TableTh({ column, className, contentClassName }: TProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sort = searchParams.get(sortQuery);
  const order = searchParams.get(orderQuery);

  const handleSortColumn = () => {
    const params = new URLSearchParams(searchParams);

    const currentSort = column.property;
    const currentOrder = order ?? "ASC";

    if (sort === currentSort && currentOrder === "ASC") {
      params.set(orderQuery, "DESC");
      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    if (sort === currentSort && currentOrder === "DESC") {
      params.delete(orderQuery);
      params.delete(sortQuery);
      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    params.set(sortQuery, currentSort);
    params.set(orderQuery, "ASC");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <MuiTableCell
      className={twMerge(
        "text-xs text-multi-neutral-950 font-semibold border-b border-multi-neutral-100 p-0 bg-multi-neutral-50",
        className,
      )}
      sx={{ border: 0 }}
    >
      <Box
        className={twMerge(
          "flex items-center justify-start gap-1 w-full min-w-20 max-w-56 whitespace-nowrap p-4",
          contentClassName,
        )}
        component={column.sort ? ButtonBase : "div"}
        onClick={column.sort ? handleSortColumn : undefined}
      >
        <If condition={!!column.sort}>
          <SortIcon column={column} order={order} sort={sort} />
        </If>
        <p>{column.label}</p>
      </Box>
    </MuiTableCell>
  );
}
