import { render, screen } from "@testing-library/react";

import { TableTd } from "./table.td";

describe("Table TableTd Component", () => {
  it("renders the component correctly", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd>
              <p>Test</p>
            </TableTd>
          </tr>
        </tbody>
      </table>,
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("applies classes correctly", async () => {
    const classNameMock = "className";
    const contentClassNameMock = "contentClassName";

    render(
      <table>
        <tbody>
          <tr>
            <TableTd
              className={classNameMock}
              contentClassName={contentClassNameMock}
            >
              <p>Test</p>
            </TableTd>
          </tr>
        </tbody>
      </table>,
    );

    const { children } = await screen.findByRole("cell");

    expect(screen.getByRole("cell")).toHaveClass(classNameMock);
    expect(children[0]).toHaveClass(contentClassNameMock);
  });
});
