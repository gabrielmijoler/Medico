import { useRouter } from "next/navigation";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GoBackButton } from "./goBackButton";

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(),
  };
});

describe("GoBackButton Component", () => {
  const mockRouter = {
    back: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("Should render the button with the correct icon", () => {
    render(<GoBackButton />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toContainElement(
      screen.getByTestId("ArrowBackIcon"),
    );
  });

  it("Should call router.back() when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<GoBackButton />);

    const goBackButton = screen.getByRole("button");

    await user.click(goBackButton);
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
