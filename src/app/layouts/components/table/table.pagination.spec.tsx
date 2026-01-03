import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TablePagination } from "./table.pagination";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

type TProps = React.ComponentProps<typeof TablePagination>;

describe("Table TablePagination component", () => {
  const props: TProps = {
    perPage: 5,
    total: 10,
    perPageOptions: [5, 10],
  };

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render the pagination component correctly", () => {
    render(
      <table>
        <TablePagination {...props} />
      </table>,
    );

    expect(screen.getByText("1-5 de 10 itens")).toBeInTheDocument();
    const perPageSelect = screen.getByText("5/página");
    expect(perPageSelect).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("Should show correct text for total 0", () => {
    render(
      <table>
        <TablePagination />
      </table>,
    );

    expect(screen.getByText("0-0 de 0 itens")).toBeInTheDocument();
  });

  it("Should update the page query when changing the perPage value", async () => {
    const user = userEvent.setup();
    const params = new URLSearchParams({ page: "1", perPage: "10" });

    render(
      <table>
        <TablePagination {...props} />
      </table>,
    );

    const perPageSelect = screen.getByText("5/página");
    await user.click(perPageSelect);
    const perPageOption = screen.getByRole("option", { name: "10" });
    await user.click(perPageOption);

    expect(mockRouter.push).toHaveBeenCalledWith(
      `${mockPathname}?${params.toString()}`,
    );
  });

  it("Should update the page query when changing pages via MultiPagination", async () => {
    const user = userEvent.setup();
    const params = new URLSearchParams({ page: "2" });

    render(
      <table>
        <TablePagination {...props} />
      </table>,
    );

    const nextPageButton = screen.getByLabelText("Go to page 2");
    await user.click(nextPageButton);

    expect(mockRouter.push).toHaveBeenCalledWith(
      `${mockPathname}?${params.toString()}`,
    );
  });

  it("Should update the page query when typing a new page in the input field and pressing Enter", async () => {
    const user = userEvent.setup();
    const params = new URLSearchParams({ page: "2" });

    const { container } = render(
      <table>
        <TablePagination {...props} />
      </table>,
    );

    const pageInput = container.getElementsByTagName("input")[1];
    await user.type(pageInput, "2{enter}");

    expect(mockRouter.push).toHaveBeenCalledWith(
      `${mockPathname}?${params.toString()}`,
    );
  });
});
