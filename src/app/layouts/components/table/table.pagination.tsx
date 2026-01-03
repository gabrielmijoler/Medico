"use client";
import { type KeyboardEvent, useMemo } from "react";

import usePagination from "@/app/hooks/usePagination";
import styled from "@emotion/styled";
import { ExpandMore } from "@mui/icons-material";
import {
  MenuItem,
  Select,
  TableCell,
  TableFooter,
  TableRow,
} from "@mui/material";

import NumericField from "../numericField";
import Pagination from "../pagination";

type TProps = {
  perPageOptions?: number[];
  perPage?: number;
  total?: number;
};

const SelectIcon = styled(ExpandMore)({
  width: 14,
  height: 14,
});

export function TablePagination({
  perPage = 10,
  total = 0,
  perPageOptions = [10, 15, 20],
}: TProps) {
  const {
    count,
    currentPage,
    currentPerPage,
    handleChangePage,
    handleSelectPerPage,
  } = usePagination({ perPage, total });

  const toItem = currentPerPage * currentPage;
  const fromItem = total === 0 ? total : toItem - (currentPerPage - 1);

  const itemCountText = `${fromItem}-${Math.min(toItem, total)} de ${total} itens`;

  const handleInputPage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleChangePage(e, Number((e.target as HTMLInputElement).value));
    }
  };

  const mappedPerPageOptions = useMemo(
    () =>
      perPageOptions.map((option) => (
        <MenuItem
          className="text-xs font-semibold text-multi-text-primary"
          key={option}
          value={option}
        >
          {option}
        </MenuItem>
      )),
    [perPageOptions],
  );

  return (
    <TableFooter className="bg-white border-t border-multi-neutral-100">
      <TableRow>
        <TableCell colSpan={1000} sx={{ border: 0 }}>
          <div className="flex items-center justify-between text-xs font-semibold text-multi-text-primary">
            <div className="flex items-center gap-2">
              <p>{itemCountText}</p>

              <Select
                IconComponent={SelectIcon}
                onChange={handleSelectPerPage}
                renderValue={(value) => `${value}/página`}
                slotProps={{
                  input: {
                    className:
                      "flex items-center leading-0 h-7 p-0 pr-6 text-xs font-semibold text-multi-text-primary",
                  },
                }}
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                  "& .MuiSelect-icon": {
                    top: "unset",
                  },
                }}
                value={currentPerPage}
              >
                {mappedPerPageOptions}
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <Pagination
                count={count}
                onChange={handleChangePage}
                page={currentPage}
                size="small"
              />

              <div className="flex items-center gap-2">
                <p className="whitespace-nowrap">Ir para</p>
                <NumericField
                  onKeyDown={handleInputPage}
                  slotProps={{
                    input: {
                      className:
                        "w-16 border-multi-neutral-100 rounded p-0 h-7 text-xs font-semibold text-multi-text-primary",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
