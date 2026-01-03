"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ErrorImage from "@images/error.svg";
import { Button } from "@mui/material";

type TProps = {
  reset: VoidFunction;
};

export default function Common({ reset }: TProps) {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/");
  }, [replace]);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-between p-10 bg-white">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-bold text-multi-text-primary text-[24px] sm:text-[40px] mb-4">
          Algo deu errado!
        </h1>
        <p className="font-semibold text-sm text-multi-text-primary">
          Parece que alguma coisa não funcionou como deveria.
        </p>
      </div>
      <Image
        alt="error"
        className="w-[250px] sm:w-fit"
        height={347}
        priority
        src={ErrorImage as string}
        width={392}
      />
      <Button
        className="rounded-full"
        disableElevation
        onClick={reset}
        style={{ textTransform: "none" }}
        variant="contained"
      >
        Tentar novamente
      </Button>
    </div>
  );
}
