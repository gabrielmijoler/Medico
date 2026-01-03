import * as React from "react";

import { render, screen } from "@testing-library/react";

import NavigationLoadingProvider from "./navigationLoadingProvider";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useTransition: jest.fn(),
}));

describe("NavigationLoadingProvider", () => {
  it("renders children correctly", () => {
    jest.spyOn(React, "useTransition").mockReturnValue([false, jest.fn()]);

    render(
      <NavigationLoadingProvider>
        <p>child</p>
      </NavigationLoadingProvider>,
    );

    expect(screen.getByText(/child/)).toBeInTheDocument();
  });

  it("shows LinearProgress when isNavigating is true", () => {
    jest.spyOn(React, "useTransition").mockReturnValue([true, jest.fn()]);

    render(
      <NavigationLoadingProvider>
        <p>child</p>
      </NavigationLoadingProvider>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("does not show LinearProgress when isNavigating is false", () => {
    jest.spyOn(React, "useTransition").mockReturnValue([false, jest.fn()]);

    render(
      <NavigationLoadingProvider>
        <p>child</p>
      </NavigationLoadingProvider>,
    );

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});
