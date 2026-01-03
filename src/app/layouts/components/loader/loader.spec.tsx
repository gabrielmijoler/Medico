import { render, screen } from "@testing-library/react";

import Loader from "./loader";

jest.mock("next/dynamic", () => {
  return () => {
    const Component = () => <div data-testid="lottie-mock" />;
    Component.displayName = "DynamicComponent";
    return Component;
  };
});

describe("Loader", () => {
  it("renders the Lottie animation without fullPage", () => {
    render(<Loader width={300} />);

    const lottie = screen.getByTestId("lottie-mock");
    expect(lottie).toBeInTheDocument();

    expect(lottie.parentElement).not.toHaveClass("h-screen w-screen");
  });

  it("renders the Lottie animation with fullPage", () => {
    render(<Loader fullPage width={300} />);

    const lottie = screen.getByTestId("lottie-mock");
    expect(lottie).toBeInTheDocument();

    expect(lottie.parentElement).toHaveClass("h-screen w-screen");
    expect(lottie.parentElement).toHaveClass(
      "flex items-center justify-center",
    );
  });

  it("applies the correct width to the Lottie component", () => {
    render(<Loader width={400} />);

    const lottie = screen.getByTestId("lottie-mock");

    expect(lottie).toBeInTheDocument();
  });
});
