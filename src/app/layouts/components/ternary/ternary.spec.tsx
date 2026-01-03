import { render, screen } from "@testing-library/react";

import Ternary from "./ternary";

describe("Ternary Component", () => {
  const children = [
    <div key="1">True Content</div>,
    <div key="2">False Content</div>,
  ];

  it("renders the first child when condition is true", () => {
    render(<Ternary condition={true}>{children}</Ternary>);

    expect(screen.getByText("True Content")).toBeInTheDocument();
    expect(screen.queryByText("False Content")).not.toBeInTheDocument();
  });

  it("renders the second child when condition is false", () => {
    render(<Ternary condition={false}>{children}</Ternary>);

    expect(screen.getByText("False Content")).toBeInTheDocument();
    expect(screen.queryByText("True Content")).not.toBeInTheDocument();
  });
});
