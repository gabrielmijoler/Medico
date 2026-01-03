import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { deleteCookie } from "@/app/actions";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProfileMenu from "./profileMenu";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/actions", () => ({
  deleteCookie: jest.fn(),
}));

describe("ProfileMenu Component", () => {
  const mockRouterReplace = jest.fn();
  const mockRouterPush = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockRouterReplace,
      push: mockRouterPush,
    });
  });

  const mockUser = {
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://example.com/avatar.jpg",
    emailVerified: true,
    username: "teste.teste",
    document: "",
  };

  const renderComponent = (open: boolean) =>
    render(
      <ProfileMenu
        anchorEl={document.createElement("div")}
        onClose={mockOnClose}
        open={open}
        user={mockUser}
      />,
    );

  it("renders user information correctly", () => {
    renderComponent(true);

    expect(screen.getByAltText("profile")).toHaveAttribute(
      "src",
      mockUser.avatarUrl,
    );
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it("renders menu items", () => {
    renderComponent(true);

    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  it("calls handleLogout when 'Sair' is clicked", async () => {
    const user = userEvent.setup();
    (signOut as jest.Mock).mockResolvedValue({});
    (deleteCookie as jest.Mock).mockResolvedValue({});

    renderComponent(true);

    const logoutItem = screen.getByText("Sair");
    await user.click(logoutItem);

    expect(signOut).toHaveBeenCalledWith({ redirect: false });
  });

  it("does not render when open is false", () => {
    renderComponent(false);

    expect(screen.queryByAltText("profile")).not.toBeInTheDocument();
    expect(screen.queryByText("Meus pedidos")).not.toBeInTheDocument();
  });
});
