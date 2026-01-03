import { fireEvent, render, screen } from "@testing-library/react";

import useGetNotifications from "./hooks/useGetNotifications";
import DrawerNotification from "./drawerNotification";

import "@testing-library/jest-dom";

// Mock do hook
jest.mock("./hooks/useGetNotifications");
jest.mock("jose", () => ({
  __esModule: true,
  compactDecrypt: jest.fn(() =>
    Promise.resolve({ plaintext: new TextEncoder().encode("decrypted") }),
  ),
  compactEncrypt: jest.fn(() => Promise.resolve({ ciphertext: "fake" })),
}));

jest.mock("@/app/repository/notifications", () => ({
  __esModule: true,
  default: { getNotifications: jest.fn() },
}));

const mockedUseGetNotifications = useGetNotifications as jest.Mock;

describe("DrawerNotification", () => {
  const onClose = jest.fn();

  it("deve renderizar skeletons durante o carregamento", () => {
    mockedUseGetNotifications.mockReturnValue({
      isLoading: true,
      isFetching: true,
      data: [],
    });

    render(<DrawerNotification onClose={onClose} open={true} />);
    expect(screen.getAllByTestId("skeleton")).toHaveLength(15);
  });

  it("deve exibir notificações quando carregado", () => {
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

    render(<DrawerNotification onClose={onClose} open={true} />);

    expect(screen.getByText(/CNPJ/i)).toBeInTheDocument();
    expect(screen.getByText(/Empresa Teste/)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  it("deve chamar onClose ao clicar no botão de fechar", () => {
    mockedUseGetNotifications.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: [],
    });

    render(<DrawerNotification onClose={onClose} open={true} />);
    const closeButton = screen.getByRole("button");

    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
