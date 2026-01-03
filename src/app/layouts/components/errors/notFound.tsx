"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import NotFoundImage from "@images/not-found.svg";
import { Button } from "@mui/material";

export default function NotFound() {
  const router = useRouter();
  const handleError = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-between p-10 bg-white">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-bold text-multi-text-primary text-[24px] sm:text-[40px] mb-4">
          Erro 404!
        </h1>
        <p className="font-semibold text-sm text-multi-text-primary">
          Ops! Esta página não foi encontrada ou não existe. Entre em contato
          com o seu gestor ou o setor de TI.
        </p>
      </div>
      <Image
        alt="error"
        className="w-[250px] sm:w-fit"
        height={347}
        priority
        src={NotFoundImage as string}
        width={392}
      />
      <Button
        className="rounded-full"
        disableElevation
        onClick={handleError}
        style={{ textTransform: "none" }}
        variant="contained"
      >
        Voltar a tela inicial
      </Button>
    </div>
  );
}
