import type { ComponentProps } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BaseErrorScreen from "./baseErrorScreen";

jest.mock("next/image", () => {
  const MockImage = ({ src, alt }: { src?: string; alt: string }) => (
    <img alt={alt} src={src} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

type TProps = ComponentProps<typeof BaseErrorScreen>;

describe("BaseErrorScreen", () => {
  const mockProps: TProps = {
    title: "Error",
    image: "/image.jpg",
    children: null,
  };
  const mockChildren = "Something went wrong!";

  it("renders the component correctly", () => {
    render(<BaseErrorScreen {...mockProps}>{mockChildren}</BaseErrorScreen>);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      mockProps.title,
    );
    expect(screen.getByText(mockChildren)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockProps.image);
    expect(
      screen.getByText(/Voltar para a página inicial/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /Ir para o Portal de chamados/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('renders the "Ir para o Portal de chamados" button if showCallButton is true', () => {
    render(
      <BaseErrorScreen {...mockProps} showCallButton>
        {mockChildren}
      </BaseErrorScreen>,
    );

    const callButton = screen.getByRole("button", {
      name: /Ir para o Portal de chamados/i,
    });
    expect(callButton).toBeInTheDocument();
  });

  it("renders the image with correct src and alt text", () => {
    render(
      <BaseErrorScreen {...mockProps} image="/error-image.jpg">
        {mockChildren}
      </BaseErrorScreen>,
    );

    const image = screen.getByAltText("error-image");
    expect(image).toHaveAttribute("src", "/error-image.jpg");
  });

  it("renders try again button when handleTryAgain is provided", async () => {
    const user = userEvent.setup();
    const mockHandleTryAgain = jest.fn();

    render(
      <BaseErrorScreen {...mockProps} handleTryAgain={mockHandleTryAgain}>
        {mockChildren}
      </BaseErrorScreen>,
    );

    const tryAgainButton = screen.getByText(/Tentar novament/i);

    await user.click(tryAgainButton);

    expect(tryAgainButton).toBeInTheDocument();
    expect(mockHandleTryAgain).toHaveBeenCalled();
  });
});
