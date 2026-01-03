import { render, screen } from "@testing-library/react";

import ListMenu from "./listMenu";
import { ListMenuItem } from "./listMenu.item";

describe("ListMenu Component", () => {
  it("renders without crashing", () => {
    const mockAnchorEl = {
      current: document.createElement("button"),
    };

    render(
      <ListMenu anchorEl={mockAnchorEl.current} open={false}>
        Test Content
      </ListMenu>,
    );
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("opens the menu when open is true", () => {
    const mockAnchorEl = {
      current: document.createElement("button"),
    };
    render(
      <ListMenu anchorEl={mockAnchorEl.current} open={true}>
        Test Content
      </ListMenu>,
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("closes the menu when open is false", () => {
    const mockAnchorEl = {
      current: document.createElement("button"),
    };
    render(
      <ListMenu anchorEl={mockAnchorEl.current} open={false}>
        Test Content
      </ListMenu>,
    );
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("renders children correctly", () => {
    const mockAnchorEl = {
      current: document.createElement("button"),
    };
    render(
      <ListMenu anchorEl={mockAnchorEl.current} open={true}>
        <ListMenuItem text="Item 1" />
        <ListMenuItem text="Item 2" />
      </ListMenu>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
