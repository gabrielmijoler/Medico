import { render, screen } from "@testing-library/react";

import { MobileTableCardBody } from "./mobileTableCard.body";

describe("MobileTableCardBody", () => {
  it("renders children content correctly", () => {
    render(
      <MobileTableCardBody>
        <MobileTableCardBody.Item label="Label 1">
          Content 1
        </MobileTableCardBody.Item>
        <MobileTableCardBody.Item label="Label 2">
          Content 2
        </MobileTableCardBody.Item>
      </MobileTableCardBody>,
    );

    // Check if both items are rendered correctly
    expect(screen.getByText("Label 1")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.getByText("Label 2")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("applies the correct styles to label and content", () => {
    render(
      <MobileTableCardBody>
        <MobileTableCardBody.Item label="Label 1">
          Content 1
        </MobileTableCardBody.Item>
      </MobileTableCardBody>,
    );

    // Check if the label has the correct styles
    const label = screen.getByText("Label 1");
    expect(label).toHaveClass("text-sm font-medium text-multi-text-primary");

    // Check if the content has the correct styles
    const content = screen.getByText("Content 1");
    expect(content).toHaveClass("text-sm font-medium text-multi-text-primary");
  });

  it("renders correctly with custom content", () => {
    render(
      <MobileTableCardBody>
        <MobileTableCardBody.Item label="Label 1">
          <span>Custom Content</span>
        </MobileTableCardBody.Item>
      </MobileTableCardBody>,
    );

    // Check if the custom content is rendered inside the item
    expect(screen.getByText("Custom Content")).toBeInTheDocument();
  });

  it("renders multiple items correctly", () => {
    render(
      <MobileTableCardBody>
        <MobileTableCardBody.Item label="Label 1">
          Content 1
        </MobileTableCardBody.Item>
        <MobileTableCardBody.Item label="Label 2">
          Content 2
        </MobileTableCardBody.Item>
        <MobileTableCardBody.Item label="Label 3">
          Content 3
        </MobileTableCardBody.Item>
      </MobileTableCardBody>,
    );

    // Check if multiple items are rendered correctly
    expect(screen.getByText("Label 1")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.getByText("Label 2")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.getByText("Label 3")).toBeInTheDocument();
    expect(screen.getByText("Content 3")).toBeInTheDocument();
  });
});
