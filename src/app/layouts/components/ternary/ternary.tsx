import type { ReactNode } from "react";

type TProps = {
  children: ReactNode[];
  condition: boolean;
};

export default function Ternary({ condition, children }: TProps) {
  return condition ? children[0] : children[1];
}
