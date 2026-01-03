import { render, screen } from "@testing-library/react";

import Table from "./table";

describe("Table component", () => {
  it("Should render Table", async () => {
    render(
      <Table>
        <thead>
          <tr>
            <th>Test</th>
          </tr>
        </thead>
      </Table>,
    );

    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
    expect(table).toContainElement(screen.getByText("Test"));
  });
});
