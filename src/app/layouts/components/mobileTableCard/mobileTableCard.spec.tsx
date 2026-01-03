import { render, screen } from "@testing-library/react";

import MobileTableCard from "./mobileTableCard";

describe("MobileTableCard", () => {
  it("renders the MobileTableCard with children correctly", () => {
    render(
      <MobileTableCard>
        <MobileTableCard.Header>
          <span>Header Content</span>
        </MobileTableCard.Header>
        <MobileTableCard.Body>
          <div>Body Content</div>
        </MobileTableCard.Body>
        <MobileTableCard.Footer>
          <p>Footer Content</p>
        </MobileTableCard.Footer>
      </MobileTableCard>,
    );

    // Check if all parts of the card are rendered correctly
    expect(screen.getByText("Header Content")).toBeInTheDocument();
    expect(screen.getByText("Body Content")).toBeInTheDocument();
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  it("renders the Header, Body, and Footer components properly", () => {
    render(
      <MobileTableCard>
        <MobileTableCard.Header>
          <span>Header Content</span>
        </MobileTableCard.Header>
        <MobileTableCard.Body>
          <div>Body Content</div>
        </MobileTableCard.Body>
        <MobileTableCard.Footer>
          <p>Footer Content</p>
        </MobileTableCard.Footer>
      </MobileTableCard>,
    );

    // Check if the individual parts are rendered correctly
    expect(screen.getByText("Header Content")).toBeInTheDocument();
    expect(screen.getByText("Body Content")).toBeInTheDocument();
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  it("can render without Footer", () => {
    render(
      <MobileTableCard>
        <MobileTableCard.Header>
          <span>Header Content</span>
        </MobileTableCard.Header>
        <MobileTableCard.Body>
          <div>Body Content</div>
        </MobileTableCard.Body>
      </MobileTableCard>,
    );

    // Check if only Header and Body are rendered correctly
    expect(screen.getByText("Header Content")).toBeInTheDocument();
    expect(screen.getByText("Body Content")).toBeInTheDocument();

    // Ensure Footer is not rendered
    expect(screen.queryByText("Footer Content")).not.toBeInTheDocument();
  });

  it("can render without Body", () => {
    render(
      <MobileTableCard>
        <MobileTableCard.Header>
          <span>Header Content</span>
        </MobileTableCard.Header>
        <MobileTableCard.Footer>
          <p>Footer Content</p>
        </MobileTableCard.Footer>
      </MobileTableCard>,
    );

    // Check if only Header and Footer are rendered correctly
    expect(screen.getByText("Header Content")).toBeInTheDocument();
    expect(screen.getByText("Footer Content")).toBeInTheDocument();

    // Ensure Body is not rendered
    expect(screen.queryByText("Body Content")).not.toBeInTheDocument();
  });

  it("can render without Header", () => {
    render(
      <MobileTableCard>
        <MobileTableCard.Body>
          <div>Body Content</div>
        </MobileTableCard.Body>
        <MobileTableCard.Footer>
          <p>Footer Content</p>
        </MobileTableCard.Footer>
      </MobileTableCard>,
    );

    // Check if only Body and Footer are rendered correctly
    expect(screen.getByText("Body Content")).toBeInTheDocument();
    expect(screen.getByText("Footer Content")).toBeInTheDocument();

    // Ensure Header is not rendered
    expect(screen.queryByText("Header Content")).not.toBeInTheDocument();
  });
});
