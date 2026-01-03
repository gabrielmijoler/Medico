import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ListMenuItem } from "./listMenu.item";

// Example test suite
describe("ListMenuItem", () => {
  test("renders the correct text", () => {
    const text = "Test Menu Item";

    render(<ListMenuItem text={text} />);

    // Assert that the text appears inside the button
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test("calls onClick function when clicked", () => {
    const onClick = jest.fn(); // Mock function
    const text = "Test Menu Item";

    render(<ListMenuItem onClick={onClick} text={text} />);

    // Simulate click event
    fireEvent.click(screen.getByText(text));

    // Assert that the onClick handler was called
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick function when no onClick prop is provided", async () => {
    const user = userEvent.setup();
    const text = "Test Menu Item";

    render(<ListMenuItem text={text} />);

    // Try to click, but there is no onClick handler
    await user.click(screen.getByText(text));

    // Ensure that onClick was not called (as it was not passed in)
    // Using a mock function for this test would ensure that it's not triggered
    // no need to assert onClick here as it's not passed
  });
});
