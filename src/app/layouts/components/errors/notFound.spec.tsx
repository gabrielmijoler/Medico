import { useRouter } from "next/navigation";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Error from "./notFound";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NotFound Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders the component correctly", () => {
    render(<Error />);

    expect(screen.getByText(/Erro 404!/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Ops! Esta página não foi encontrada ou não existe. Entre em contato com o seu gestor ou o setor de TI./,
      ),
    ).toBeInTheDocument();
    expect(screen.getByAltText("error")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Voltar a tela inicial/ }),
    ).toBeInTheDocument();
  });

  it("calls router.push when the button is clicked", async () => {
    const user = userEvent.setup();

    render(<Error />);

    const button = screen.getByRole("button", {
      name: /Voltar a tela inicial/,
    });

    await user.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});
