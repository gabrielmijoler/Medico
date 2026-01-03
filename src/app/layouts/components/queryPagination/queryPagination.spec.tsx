import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import QueryPagination from "./queryPagination";

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
  };
});

type TProps = React.ComponentProps<typeof QueryPagination>;

describe("QueryPagination Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockPathname = "pathname";

  beforeEach(() => {
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render QueryPagination", async () => {
    render(<QueryPagination />);

    await screen.findByRole("navigation");

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Itens por página:")).toBeInTheDocument();
  });

  it("Should only render 1 page if total is less than or equal to perPage", () => {
    const props: TProps = {
      total: 4,
      perPage: 5,
      perPageOptions: [5],
    };

    render(<QueryPagination {...props} />);

    const pageButtons = screen.getAllByLabelText(/page \d/);

    expect(pageButtons).toHaveLength(1);
  });

  it("Should render more than 1 paage if total is higher than perPage", () => {
    const props: TProps = {
      total: 6,
      perPage: 5,
      perPageOptions: [5],
    };

    render(<QueryPagination {...props} />);

    const pageButtons = screen.getAllByLabelText(/page \d/);

    expect(pageButtons).toHaveLength(2);
  });

  it("Should render values passed as props on perPage select", async () => {
    const user = userEvent.setup();
    const perPageOptions = [5, 10, 15];
    const props: TProps = {
      perPage: 5,
      perPageOptions,
    };

    render(<QueryPagination {...props} />);

    const select = await screen.findByRole("combobox");

    await user.click(select);

    for (const option of perPageOptions) {
      expect(
        within(screen.getByRole("listbox")).getByText(option),
      ).toBeInTheDocument();
    }
  });

  it("Should navigate when clicking a page", async () => {
    const mockSearchParams = new URLSearchParams();
    const expectedSearchParams = new URLSearchParams({ page: "2" });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    const user = userEvent.setup();

    const props: TProps = {
      total: 40,
      perPage: 5,
      perPageOptions: [5],
    };

    render(<QueryPagination {...props} />);

    const button = screen.getByText("2");

    await user.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith(
      `${mockPathname}?${expectedSearchParams.toString()}`,
    );
  });

  it("Should navigate when selecting perPage", async () => {
    const mockSearchParams = new URLSearchParams();
    const expectedSearchParams = new URLSearchParams({
      page: "1",
      perPage: "20",
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    const user = userEvent.setup();

    render(<QueryPagination />);

    const button = screen.getByText("10");

    await user.click(button);

    const option = screen.getByText("20");

    await user.click(option);

    expect(mockRouter.push).toHaveBeenCalledWith(
      `${mockPathname}?${expectedSearchParams.toString()}`,
    );
  });
});
