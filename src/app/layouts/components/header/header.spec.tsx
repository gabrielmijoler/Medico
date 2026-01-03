import { render, screen } from "@testing-library/react";

import useGetNotifications from "../drawerNotification/hooks/useGetNotifications";
import useGetNotificationsCount from "../drawerNotification/hooks/useGetNotificationsCount";

import Header from "./header";

// eslint-disable-next-line react/display-name
jest.mock("../profile", () => () => (
  <div data-testid="profile-component">Profile Component</div>
));

jest.mock("../drawerNotification/hooks/useGetNotificationsCount");
jest.mock("../drawerNotification/hooks/useGetNotifications");
jest.mock("@/app/repository/notifications", () => ({
  __esModule: true,
  default: { getNotifications: jest.fn() },
}));

const mockedUseGetNotificationsCount = useGetNotificationsCount as jest.Mock;
const mockedUseGetNotifications = useGetNotifications as jest.Mock;

describe("Header Component", () => {
  mockedUseGetNotifications.mockReturnValue({
    isLoading: false,
    isFetching: false,
    data: [
      {
        createdAt: new Date("2023-12-01T10:00:00Z").toISOString(),
        status: "pending",
        company: {
          cnpj: "12345678000199",
          name: "Empresa Teste",
        },
      },
    ],
  });
  mockedUseGetNotificationsCount.mockReturnValue({
    isLoading: true,
    isFetching: true,
    data: {
      count: 1,
    },
  });
  it("renders the header correctly", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    screen.getByAltText("Full logo");

    const profileComponent = screen.getByTestId("profile-component");
    expect(profileComponent).toBeInTheDocument();
  });

  it("has the correct styling classes", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass(
      "flex items-center justify-between sticky border-b border-b-gray-200 px-6 py-5 bg-white",
    );
  });

  it("renders logo with its correct path", async () => {
    render(<Header />);

    const image = await screen.findByRole("img");

    expect(image.parentElement).toHaveAttribute("href", "/");
  });
});
