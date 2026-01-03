"use client";
import { createContext, type ReactNode, useTransition } from "react";
import type { TransitionStartFunction } from "react";

import { LinearProgress } from "@mui/material";

import If from "../if";

type TProps = {
  children: ReactNode | ReactNode[];
};

type TNavigationLoadingContext = {
  isNavigating: boolean;
  startNavigating: TransitionStartFunction;
};

export const NavigationLoadingContext =
  createContext<TNavigationLoadingContext>({
    isNavigating: false,
    startNavigating: () => null,
  });

export default function NavigationLoadingProvider({ children }: TProps) {
  const [isNavigating, startNavigating] = useTransition();

  return (
    <NavigationLoadingContext.Provider
      value={{ isNavigating, startNavigating }}
    >
      <div className="fixed top-0 w-full z-[9999]">
        <If condition={isNavigating}>
          <LinearProgress />
        </If>
      </div>
      {children}
    </NavigationLoadingContext.Provider>
  );
}
