import { useRouter } from "next/navigation";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Common from "./common";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Common Component", () => {
  const mockReset = jest.fn();
  const mockRouter = {
    replace: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders the component correctly", () => {
    render(<Common reset={mockReset} />);

    expect(screen.getByText(/Algo deu errado!/)).toBeInTheDocument();
    expect(
      screen.getByText(/Parece que alguma coisa não funcionou como deveria./),
    ).toBeInTheDocument();
    expect(screen.getByAltText("error")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Tentar novamente/ }),
    ).toBeInTheDocument();
  });

  it("calls router.replace on first render", async () => {
    render(<Common reset={mockReset} />);

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith("/");
    });
  });

  it("calls reset when the button is clicked", async () => {
    const user = userEvent.setup();

    render(<Common reset={mockReset} />);

    const button = screen.getByRole("button", {
      name: /Tentar novamente/,
    });

    await user.click(button);

    expect(mockReset).toHaveBeenCalled();
  });
});
