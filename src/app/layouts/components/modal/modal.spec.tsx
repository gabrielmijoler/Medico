import { fireEvent, render, screen } from "@testing-library/react";

import Modal from "./modal";

describe("Modal Component", () => {
  it("renders without crashing", () => {
    const setOpen: VoidFunction = jest.fn();
    render(
      <Modal open={true} setOpen={setOpen}>
        <Modal.Title>Test Title</Modal.Title>
        <Modal.Text>Test Content</Modal.Text>
        <Modal.Actions>
          <Modal.CancelButton
            onClick={() => {
              setOpen();
            }}
          >
            Cancel
          </Modal.CancelButton>
          <Modal.ConfirmButton
            onClick={() => {
              console.log("Confirmed");
            }}
          >
            Confirm
          </Modal.ConfirmButton>
        </Modal.Actions>
      </Modal>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();

    expect(screen.getByText("Test Content")).toBeInTheDocument();

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls setOpen with false when the cancel button is clicked", () => {
    const setOpen = jest.fn();
    render(
      <Modal open={true} setOpen={setOpen}>
        <Modal.Actions>
          <Modal.CancelButton
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Modal.CancelButton>
        </Modal.Actions>
      </Modal>,
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it("does not render when `open` is false", () => {
    const setOpen: VoidFunction = jest.fn();
    render(
      <Modal open={false} setOpen={setOpen}>
        <Modal.Text>Should not render</Modal.Text>
      </Modal>,
    );

    expect(screen.queryByText("Should not render")).not.toBeInTheDocument();
  });

  it("closes when onClose is triggered", () => {
    const setOpen: VoidFunction = jest.fn();
    render(
      <Modal open={true} setOpen={setOpen}>
        <Modal.Text>Close Test</Modal.Text>
      </Modal>,
    );

    const backdrop = document.querySelector(".MuiBackdrop-root");
    expect(backdrop).toBeInTheDocument();

    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
