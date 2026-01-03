"use client";

import Image from "next/image";
import Link from "next/link";

import useToggle from "@/app/hooks/useToggle";
import { Notifications } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";

import DrawerNotification from "../drawerNotification";
import useGetNotificationsCount from "../drawerNotification/hooks/useGetNotificationsCount";
import If from "../if";
import Profile from "../profile";

type TNewItemDot = {
  show?: boolean | undefined;
};

function NewItemDot({ show }: TNewItemDot) {
  return (
    <If condition={Boolean(show)}>
      <div className="absolute top-0 right-0 z-10 bg-multi-warning-lightest rounded-full w-2 h-2" />
    </If>
  );
}

export default function Header() {
  const { data: notifications } = useGetNotificationsCount({ enabled: true });
  const [openNotificationDrawer, toggleNotificationDrawer] = useToggle(false);

  return (
    <header className="flex items-center justify-between sticky border-b border-b-gray-200 px-6 py-5 bg-white">
      <Link href="/">
        <Image
          alt="Full logo"
          className="h-auto cursor-pointer"
          height={45}
          priority
          src="/assets/images/multi-acessos-logo.svg"
          width={152}
        />
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/minhas-solicitacoes">
          <Button
            className="rounded-full truncate"
            size="small"
            style={{ textTransform: "none" }}
            variant="outlined"
          >
            Minhas solicitações
          </Button>
        </Link>
        <IconButton
          className="w-4 h-4 p-1"
          onClick={toggleNotificationDrawer}
          size="small"
        >
          <NewItemDot show={!!notifications?.count} />
          <Notifications className="text-md" color="primary" />
        </IconButton>
        <Profile />
      </div>
      <DrawerNotification
        onClose={toggleNotificationDrawer}
        open={openNotificationDrawer}
      />
    </header>
  );
}
