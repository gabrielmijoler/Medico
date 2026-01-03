import { render, screen } from "@testing-library/react";

import { MobileTableCardFooter } from "./mobileTableCard.footer";

describe("MobileTableCardFooter", () => {
  it("renders children content correctly", () => {
    render(
      <MobileTableCardFooter>
        <span>Footer Content</span>
      </MobileTableCardFooter>,
    );

    // Check if the children content is rendered correctly
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  it("applies default styles correctly", () => {
    render(
      <MobileTableCardFooter>
        <span>Footer Content</span>
      </MobileTableCardFooter>,
    );

    const footerElement = screen.getByText("Footer Content").parentElement;

    // Check if the default styles are applied
    expect(footerElement).toHaveClass("flex items-center justify-between pt-2");
  });

  it("merges additional className when provided", () => {
    render(
      <MobileTableCardFooter className="bg-red-500">
        <span>Footer Content</span>
      </MobileTableCardFooter>,
    );

    const footerElement = screen.getByText("Footer Content").parentElement;

    // Check if the custom className is applied in addition to the default classes
    expect(footerElement).toHaveClass("bg-red-500");
    expect(footerElement).toHaveClass("flex items-center justify-between pt-2");
  });
});
