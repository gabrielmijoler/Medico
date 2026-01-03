import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ListItem from "./listItem";
type TProps = React.ComponentProps<typeof ListItem>;

jest.mock("next/navigation");
jest.mock("next-auth/react");

describe("ListItem Component", () => {
  it("Should render ListItem", async () => {
    const user = userEvent.setup();

    jest.mock("next-auth/react", () => ({
      useSession: () => ({
        data: {
          user: {
            name: "Teste",
          },
        },
        status: "authenticated",
      }),
    }));

    const mockedOnClick = jest.fn();
    const props: TProps = {
      onClose: jest.fn,
      title: "Teste",
      onClick: mockedOnClick,
      icon: <ExitToAppIcon />,
    };

    render(<ListItem {...props} />);
    expect(screen.getByText("Teste"));

    const button = screen.getByText("Teste").closest("div");

    if (button) await user.click(button);

    expect(mockedOnClick).toHaveBeenCalled();
  });
});
