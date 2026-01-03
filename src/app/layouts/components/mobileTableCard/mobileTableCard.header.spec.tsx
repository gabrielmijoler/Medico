import { render, screen } from "@testing-library/react";

import { MobileTableCardHeader } from "./mobileTableCard.header";

describe("MobileTableCardHeader", () => {
  it("renders children content correctly", () => {
    render(
      <MobileTableCardHeader>
        <span>Header Content</span>
      </MobileTableCardHeader>,
    );

    // Check if the children content is rendered correctly
    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });

  it("applies default styles correctly", () => {
    render(
      <MobileTableCardHeader>
        <span>Header Content</span>
      </MobileTableCardHeader>,
    );

    const headerElement = screen.getByText("Header Content").parentElement;

    // Check if the default styles are applied
    expect(headerElement).toHaveClass(
      `flex items-center justify-between pb-4 border-b border-multi-neutral-100 
      text-multi-neutral-950 text-sm font-medium`,
    );
  });

  it("merges additional className when provided", () => {
    render(
      <MobileTableCardHeader className="bg-blue-500">
        <span>Header Content</span>
      </MobileTableCardHeader>,
    );

    const headerElement = screen.getByText("Header Content").parentElement;

    // Check if the custom className is applied in addition to the default classes
    expect(headerElement).toHaveClass("bg-blue-500");
    expect(headerElement).toHaveClass(
      `flex items-center justify-between pb-4 border-b border-multi-neutral-100 
      text-multi-neutral-950 text-sm font-medium`,
    );
  });
});
