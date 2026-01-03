import { render, screen } from "@testing-library/react";

import GoBackHeader from "./goBackHeader";

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(),
  };
});

type TProps = React.ComponentProps<typeof GoBackHeader>;

describe("GoBackHeader component", () => {
  const props: TProps = {
    title: "Title",
    description: "Description",
  };

  it("Should render GoBackHeader", () => {
    render(<GoBackHeader {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should render children if provided", () => {
    const childrenContent = <div>Children</div>;

    render(<GoBackHeader {...props}>{childrenContent}</GoBackHeader>);

    expect(screen.getByText("Children")).toBeInTheDocument();
  });
});
