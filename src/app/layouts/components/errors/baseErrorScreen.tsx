import Image from "next/image";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "@mui/material";

import If from "../if";

type TProps = {
  title: string;
  children: ReactNode;
  image: string;
  showCallButton?: boolean;
  handleTryAgain?: VoidFunction;
  initialPageLink?: string;
  containerClassName?: string;
};

export default function BaseErrorScreen({
  title,
  image,
  children,
  showCallButton,
  handleTryAgain,
  initialPageLink = "/",
  containerClassName,
}: TProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col-reverse lg:flex-row items-center justify-center w-screen h-screen p-8 md:p-[52px] bg-white",
        containerClassName,
      )}
    >
      <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[524px]">
        <h1 className="text-multi-primary-base text-[32px] font-bold">
          {title}
        </h1>
        <p className="w-full md:w-[400px] text-multi-text-primary">
          {children}
        </p>
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <a className="w-full md:w-fit" href={initialPageLink}>
            <Button
              className="w-full md:w-fit rounded-full font-semibold text-base py-2"
              color="primary"
              style={{ textTransform: "none" }}
              variant="outlined"
            >
              Voltar para a página inicial
            </Button>
          </a>
          <If condition={!!handleTryAgain}>
            <Button
              className="w-full md:w-fit rounded-full font-semibold text-base py-2"
              disableElevation
              onClick={handleTryAgain}
              style={{ textTransform: "none" }}
              variant="contained"
            >
              Tentar novamente
            </Button>
          </If>
          <If condition={!!showCallButton}>
            <a className="w-full md:w-fit" href="#">
              <Button
                className="w-full md:w-fit rounded-full font-semibold text-base py-2"
                disableElevation
                style={{ textTransform: "none" }}
                variant="contained"
              >
                Ir para o Portal de chamados
              </Button>
            </a>
          </If>
        </div>
      </div>
      <Image
        alt="error-image"
        className="md:mt-[100px] max-lg:mb-[-50px] w-fit md:w-[70%] lg:w-fit"
        priority
        src={image}
      />
    </div>
  );
}
