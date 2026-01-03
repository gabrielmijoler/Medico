"use client";

import type { ReactElement } from "react";

import type { IconProps } from "@mui/material";

type TListItemOnClick = {
  onClick?: VoidFunction;
  onClose: VoidFunction;
};

type TListItemProps = TListItemOnClick & {
  icon: ReactElement<IconProps>;
  title: string;
};

const handleListItemOnClick = ({ onClick, onClose }: TListItemOnClick) => {
  if (onClick) onClick();
  onClose();
};

export default function ListItem({
  title,
  icon,
  onClick,
  onClose,
}: TListItemProps) {
  return (
    <div
      className="flex gap-4 my-1 cursor-pointer hover:bg-gray-200 transition-all rounded p-4"
      data-testid={title}
      onClick={() => {
        handleListItemOnClick({ onClick, onClose });
      }}
    >
      {icon}
      <p className="font-semibold text-multi-neutral-900 text-nowrap">
        {title}
      </p>
    </div>
  );
}
