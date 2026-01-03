"use client";
import { twMerge } from "tailwind-merge";

import colors from "@/app/theme/colors";
import { Button } from "@mui/material";

type TProps = {
  text: string;
  onClick?: VoidFunction;
};

export function ListMenuItem({ text, onClick }: TProps) {
  return (
    <Button
      className={twMerge(
        "normal-case text-multi-neutral-600 justify-start px-3 py-4 text-xs font-semibold",
        "border-b border-solid last:border-b-0 rounded-none",
      )}
      fullWidth
      onClick={onClick}
      sx={{
        borderColor: colors.neutral[100],
      }}
    >
      {text}
    </Button>
  );
}
