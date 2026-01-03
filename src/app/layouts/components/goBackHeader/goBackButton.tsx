"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type TProps = {
  className?: string;
};
export function GoBackButton({ className }: TProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <IconButton
      className={twMerge(
        "bg-multi-primary-base text-multi-primary-lighter p-2 w-8 h-8 sm:w-10 sm:h-10",
        className,
      )}
      onClick={handleGoBack}
    >
      <ArrowBack className="w-4 h-4 sm:w-5 sm:h-5" />
    </IconButton>
  );
}
