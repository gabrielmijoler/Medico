"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { deleteCookie } from "@/app/actions";
import type { TUser } from "@/app/types";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Avatar, Divider, Menu, styled } from "@mui/material";

import ListItem from "./listItem";

type TProps = {
  open: boolean;
  anchorEl: Element | null;
  user?: TUser;
  onClose: VoidFunction;
};

const StyledMenu = styled(Menu)({
  "& .MuiMenu-paper": {
    padding: 16,
    marginTop: 16,
  },
});

export default function ProfileMenu({ open, anchorEl, onClose, user }: TProps) {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await deleteCookie("company");
    await signOut({ redirect: false });
    router.replace("/login");
  }, [router]);

  return (
    <StyledMenu anchorEl={anchorEl} onClose={onClose} open={open}>
      <div className="flex items-center">
        <Avatar alt="profile" src={user?.avatarUrl ?? ""} />
        <div className="ml-2">
          <p className="text-sm font-medium text-multi-primary-darkest text-nowrap">
            {user?.name}
          </p>
          <p className="text-xs text-multi-primary-lightest text-nowrap">
            {user?.email}
          </p>
        </div>
      </div>
      <Divider className="my-4" />
      <nav>
        <ListItem
          icon={<ExitToAppIcon className="text-multi-neutral-900" />}
          onClick={handleLogout}
          onClose={onClose}
          title="Sair"
        />
      </nav>
    </StyledMenu>
  );
}
