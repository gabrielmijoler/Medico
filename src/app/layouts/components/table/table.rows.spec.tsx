import { render, screen } from "@testing-library/react";

import { TableRows } from "./table.rows";

describe("Table TableRows Component", () => {
  const mockColumns = [
    { label: "Name", property: "name" },
    { label: "Age", property: "age" },
  ];

  const mockData = [
    { id: "1", name: "John", age: 30 },
    { id: "2", name: "Jane", age: 25 },
  ];

  const mockClassNameOne = "mock-classname-one";
  const mockClassNameTwo = "mock-classname-one";

  const mockMapTo = jest
    .fn()
    .mockImplementation((data: (typeof mockData)[number]) => ({
      name: { content: data.name, className: mockClassNameOne },
      age: { content: data.age, className: mockClassNameTwo },
    }));

  it("Should render the rows based on the data and columns", () => {
    render(
      <table>
        <TableRows columns={mockColumns} data={mockData} mapTo={mockMapTo} />
      </table>,
    );

    expect(mockMapTo).toHaveBeenCalledTimes(2);
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("Should apply the correct class names to each row cell", () => {
    render(
      <table>
        <TableRows columns={mockColumns} data={mockData} mapTo={mockMapTo} />
      </table>,
    );

    const johnRow = screen.getByText("John").closest("tr");
    const janeRow = screen.getByText("Jane").closest("tr");

    const johnNameCell = johnRow?.querySelector("td:nth-child(1) div");
    const johnAgeCell = johnRow?.querySelector("td:nth-child(2) div");

    const janeNameCell = janeRow?.querySelector("td:nth-child(1) div");
    const janeAgeCell = janeRow?.querySelector("td:nth-child(2) div");

    expect(johnNameCell).toHaveClass(mockClassNameOne);
    expect(johnAgeCell).toHaveClass(mockClassNameOne);

    expect(janeNameCell).toHaveClass(mockClassNameTwo);
    expect(janeAgeCell).toHaveClass(mockClassNameTwo);
  });

  it("Should render default content when there is no content for a row cell", () => {
    const incompleteData = [{ id: "3", name: "Jack" }]; // No age

    render(
      <table>
        <TableRows
          columns={mockColumns}
          data={incompleteData}
          mapTo={mockMapTo}
        />
      </table>,
    );

    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("Should render the correct table structure", () => {
    render(
      <table>
        <TableRows columns={mockColumns} data={mockData} mapTo={mockMapTo} />
      </table>,
    );

    const tableRows = screen.getAllByRole("row");
    expect(tableRows).toHaveLength(2);

    const tableCells = screen.getAllByRole("cell");
    expect(tableCells).toHaveLength(mockData.length * mockColumns.length);
  });
});
