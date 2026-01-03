import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TableHead } from "@mui/material";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TableTh } from "./table.th";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Table TableTh component", () => {
  const mockColumn = { label: "Age", property: "age" };
  const mockColumnSort = { label: "Name", property: "name", sort: true };
  const mockRouter = {
    push: jest.fn(),
  };
  const mockPathname = "pathname";
  const mockSearchParams = new URLSearchParams();
  const ascSearchParams = new URLSearchParams({
    sort: "name",
    order: "ASC",
  });
  const descSearchParams = new URLSearchParams({
    sort: "name",
    order: "DESC",
  });

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh column={mockColumnSort} />
          </tr>
        </thead>
      </table>,
    );

    expect(screen.getByText(mockColumnSort.label)).toBeInTheDocument();
    expect(screen.getByTestId("UnfoldMoreIcon")).toBeInTheDocument();
  });

  it("renders sorting cells correctly", () => {
    const { container } = render(
      <table>
        <TableHead>
          <tr>
            <TableTh column={mockColumnSort} />
            <TableTh column={mockColumn} />
          </tr>
        </TableHead>
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

  it("sorts column by ASC", async () => {
    const user = userEvent.setup();

    render(
      <table>
        <thead>
          <tr>
            <TableTh column={mockColumnSort} />
          </tr>
        </thead>
      </table>,
    );

    const button = await screen.findByRole("button");

    await user.click(button);
    expect(mockRouter.push).toHaveBeenCalledWith(
      `${mockPathname}?${ascSearchParams.toString()}`,
    );
  });

  it("sorts column by DESC", async () => {
    (useSearchParams as jest.Mock).mockReturnValue(ascSearchParams);
    const user = userEvent.setup();

    render(
      <table>
        <thead>
          <tr>
            <TableTh column={mockColumnSort} />
          </tr>
        </thead>
      </table>,
    );

    const button = await screen.findByRole("button");

    await user.click(button);
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        `${mockPathname}?${descSearchParams.toString()}`,
      );
    });
  });

  it("unsorts column", async () => {
    (useSearchParams as jest.Mock).mockReturnValue(descSearchParams);
    const user = userEvent.setup();

    render(
      <table>
        <thead>
          <tr>
            <TableTh column={mockColumnSort} />
          </tr>
        </thead>
      </table>,
    );

    const button = await screen.findByRole("button");

    await user.click(button);
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        `${mockPathname}?${mockSearchParams.toString()}`,
      );
    });
  });
});
