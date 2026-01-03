import { render, screen } from "@testing-library/react";

import If from "./if";

describe("Componente If", () => {
  it("Render If when truthy condition", () => {
    render(
      <If condition={true}>
        <div data-testid="child">visible content</div>
      </If>,
    );

    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("visible content");
  });

  it("Render If when falsy condition", () => {
    const { queryByTestId } = render(
      <If condition={false}>
        <div data-testid="child">not visible content</div>
      </If>,
    );

    const child = queryByTestId("child");
    expect(child).not.toBeInTheDocument();
  });
});
