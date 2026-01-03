import type { ReactNode } from "react";

import { MobileTableCardBody } from "./mobileTableCard.body";
import { MobileTableCardFooter } from "./mobileTableCard.footer";
import { MobileTableCardHeader } from "./mobileTableCard.header";

type TProps = {
  children: ReactNode | ReactNode[];
};

export default function MobileTableCard({ children }: TProps) {
  return (
    <div className="p-4 border border-multi-neutral-100 rounded-lg">
      {children}
    </div>
  );
}

MobileTableCard.Header = MobileTableCardHeader;
MobileTableCard.Body = MobileTableCardBody;
MobileTableCard.Footer = MobileTableCardFooter;
