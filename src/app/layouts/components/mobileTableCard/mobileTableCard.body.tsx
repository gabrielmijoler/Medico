import type { ReactNode } from "react";

import { Grid2 } from "@mui/material";

type TMobileTableCardBodyItem = {
  label: string;
  children: ReactNode | ReactNode[];
};

function MobileTableCardBodyItem({
  label,
  children,
}: TMobileTableCardBodyItem) {
  return (
    <>
      <Grid2 size={6}>
        <p className="text-sm font-medium text-multi-text-primary">{label}</p>
      </Grid2>

      <Grid2 size={6}>
        <div className="text-sm font-medium text-multi-text-primary">
          {children}
        </div>
      </Grid2>
    </>
  );
}

type TProps = {
  children: ReactNode | ReactNode[];
};

export function MobileTableCardBody({ children }: TProps) {
  return (
    <Grid2 columnSpacing={2} container rowSpacing={1} sx={{ paddingY: 1 }}>
      {children}
    </Grid2>
  );
}

MobileTableCardBody.Item = MobileTableCardBodyItem;
