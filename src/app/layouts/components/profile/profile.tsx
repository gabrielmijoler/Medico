"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import type { TUser } from "@/app/types";
import { Avatar } from "@mui/material";

import Ternary from "../ternary";

import ProfileMenu from "./profileMenu";
import ProfileSkeleton from "./skeleton";

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const session = useSession();
  const isLoadingSession = session.status === "loading";

  const user: TUser | undefined = session.data?.user;
  const firstName = user?.name.split(" ")[0];
  const introductionText = firstName ? `Olá, ${firstName}` : "";

  const handleOpenprofileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Ternary condition={isLoadingSession}>
      <ProfileSkeleton />
      <div className="relative">
        <div
          className="flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-1"
          onClick={handleOpenprofileMenu}
          role="button"
        >
          <Avatar alt="profile" />
          <p className="px-2 text-sm text-multi-primary-darkest font-medium max-sm:hidden">
            {introductionText}
          </p>
        </div>
        <ProfileMenu
          anchorEl={anchorEl}
          onClose={handleCloseProfileMenu}
          open={Boolean(anchorEl)}
          user={session.data?.user}
        />
      </div>
    </Ternary>
  );
}
