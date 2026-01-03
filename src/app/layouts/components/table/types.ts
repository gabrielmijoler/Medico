import type { ReactNode } from "react";

export type TTableColumn = {
  label: string;
  property: string;
  sort?: boolean;
  className?: string;
};

export type TTableRow = { content: ReactNode; className?: string };

export type TFormattedRow = Record<string, TTableRow>;
