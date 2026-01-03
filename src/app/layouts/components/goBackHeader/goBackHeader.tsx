import type { ReactNode } from "react";

import If from "../if";

import { GoBackButton } from "./goBackButton";

type TProps = {
  title: string;
  description: string;
  children?: ReactNode;
  hideGoBack?: boolean;
};

export default function GoBackHeader({
  title,
  description,
  children,
  hideGoBack,
}: TProps) {
  return (
    <div
      className="flex items-center justify-between w-full py-1 sm:py-4 mb-6 sm:mb-0 border-b 
    border-multi-neutral-100 sm:border-none"
    >
      <div className="flex items-center gap-4">
        <If condition={!hideGoBack}>
          <GoBackButton />
        </If>
        <div className="flex flex-col">
          <h4 className="text-sm sm:text-lg font-medium leading-normal">
            {title}
          </h4>
          <p className="text-multi-text-primary text-xs font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}
