import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { render, screen } from "@testing-library/react";

import { TableColumns } from "./table.columns";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Table TableColumns component", () => {
  const mockColumns = [
    { label: "Name", property: "name", sort: true },
    { label: "Age", property: "age" },
  ];

  const mockRouter = {
    push: jest.fn(),
  };
  const mockPathname = "pathname";
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  it("render the component correctly", () => {
    render(
      <table>
        <TableColumns columns={mockColumns} />
      </table>,
    );

    mockColumns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  it("renders cells correctly", () => {
    const { container } = render(
      <table>
        <TableColumns columns={mockColumns} />
      </table>,
    );

    expect(container.getElementsByTagName("th")[0]).toContainElement(
      screen.getByRole("button"),
    );
    expect(container.getElementsByTagName("th")[0]).toContainElement(
      screen.getByTestId("UnfoldMoreIcon"),
    );
    expect(container.getElementsByTagName("th")[1]).not.toContainElement(
      screen.getByRole("button"),
    );
    expect(container.getElementsByTagName("th")[1]).not.toContainElement(
      screen.getByTestId("UnfoldMoreIcon"),
    );
  });
});
