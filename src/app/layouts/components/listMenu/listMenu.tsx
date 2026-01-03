"use client";
import { type ReactNode } from "react";

import { Menu, styled } from "@mui/material";

import { ListMenuItem } from "./listMenu.item";

type TProps = {
  children: ReactNode | ReactNode[];
  anchorEl?: Element | null;
  open: boolean;
  className?: string;
  onClose?: VoidFunction;
};

const StyledMenu = styled(Menu)({
  "& .MuiMenu-paper": {
    padding: 0,
    marginTop: 16,
    borderRadius: 12,
  },
  "& .MuiMenu-list": {
    paddingTop: 0,
    paddingBottom: 0,
  },
});
export default function ListMenu({
  open,
  anchorEl,
  children,
  className,
  onClose,
}: TProps) {
  return (
    <StyledMenu anchorEl={anchorEl} onClose={onClose} open={open}>
      <div className={className}>{children}</div>
    </StyledMenu>
  );
}

ListMenu.Item = ListMenuItem;
