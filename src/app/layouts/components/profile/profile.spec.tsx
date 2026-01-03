import { useSession } from "next-auth/react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Profile from "./profile";

// Mock the useSession hook
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

// Mock the ProfileMenu component
jest.mock("./profileMenu", () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="profile-menu">Profile Menu</div> : null,
}));

describe("Profile Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with default state", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "John Doe" } },
      status: "authenticated",
    });

    render(<Profile />);

    expect(screen.getByText("Olá, John")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();
  });

  it("opens the profile menu when the IconButton is clicked", async () => {
    const user = userEvent.setup();
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "John Doe" } },
      status: "authenticated",
    });

    render(<Profile />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByTestId("profile-menu")).toBeInTheDocument();
  });

  it("handles unauthenticated state gracefully", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Profile />);

    expect(screen.queryByText(/Olá,/)).not.toBeInTheDocument();
    expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();
  });

  it("displays skeleton if session is loading", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "loading",
    });

    render(<Profile />);

    expect(screen.getByTestId("profile-skeleton")).toBeInTheDocument();
  });
});
