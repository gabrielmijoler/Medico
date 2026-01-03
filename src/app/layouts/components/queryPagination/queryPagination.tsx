"use client";
import { useMemo } from "react";

import usePagination from "@/app/hooks/usePagination";
import { MenuItem, Select } from "@mui/material";

import Pagination from "../pagination";

type TProps = {
  perPageOptions?: number[];
  perPage?: number;
  total?: number;
};

export default function QueryPagination({
  perPage = 10,
  total = 0,
  perPageOptions = [10, 20, 30],
}: TProps) {
  const {
    count,
    currentPage,
    currentPerPage,
    handleChangePage,
    handleSelectPerPage,
  } = usePagination({ perPage, total });

  const mappedPerPageOptions = useMemo(
    () =>
      perPageOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      )),
    [perPageOptions],
  );

  return (
    <div className="flex flex-col justify-center items-center flex-wrap w-full py-4">
      <Pagination
        count={count}
        onChange={handleChangePage}
        page={currentPage}
      />

      <div className="flex items-center gap-2 text-multi-neutral-600 text-sm">
        <p>Itens por página:</p>

        <Select
          onChange={handleSelectPerPage}
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
          }}
          value={currentPerPage}
        >
          {mappedPerPageOptions}
        </Select>
      </div>
    </div>
  );
}
