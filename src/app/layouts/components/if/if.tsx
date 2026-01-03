import type { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  condition: boolean;
};

export default function If({ condition, children }: TProps) {
  return condition ? children : null;
}
