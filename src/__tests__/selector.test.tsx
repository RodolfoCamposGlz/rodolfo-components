import "@testing-library/jest-dom";
import { Select } from "../components/select";
import { render, screen, fireEvent } from "@testing-library/react";

const mockOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
];

const unsortedOptions = [
  { value: "3", label: "Banana" },
  { value: "1", label: "Apple" },
  { value: "2", label: "Cherry" },
];

test("Renders Select Component", () => {
  render(<Select options={[]} label="" />);
  expect(true).toBeTruthy();
});

test("should open dropdown when clicked", () => {
  render(
    <Select
      id="test-selector"
      label="Test Select"
      options={mockOptions}
      onSelect={() => {}}
    />
  );

  const toggleButton = screen.getByTestId("dropdown-toggle");

  // Check that the dropdown menu is not in the document initially
  expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();

  // Click to open the dropdown
  fireEvent.click(toggleButton);

  // Check that the dropdown menu is now in the document
  expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();

  // Click to close the dropdown
  fireEvent.click(toggleButton);

  // Check that the dropdown menu is not in the document again
  expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();
});

test("should display the selected option value", () => {
  render(
    <Select
      id="test-selector"
      label="Test Select"
      options={mockOptions}
      onSelect={() => {}}
    />
  );

  const toggleButton = screen.getByTestId("dropdown-toggle");

  // Open the dropdown
  fireEvent.click(toggleButton);

  // Select the first option
  const firstOption = screen.getAllByRole("option")[0];
  fireEvent.click(firstOption);

  // Check that the selected value is displayed
  const selectedValue = screen.getByTestId("selected-value");
  expect(selectedValue).toHaveTextContent("Option 1");
});

test("should organize options from A to Z", () => {
  render(
    <Select
      id="test-selector"
      label="Test Select"
      options={unsortedOptions}
      isSorted={true}
      onSelect={() => {}}
    />
  );

  const toggleButton = screen.getByTestId("dropdown-toggle");

  // Open the dropdown
  fireEvent.click(toggleButton);

  // Get all options
  const options = screen.getAllByRole("option");

  // Check the order of options
  expect(options[0]).toHaveTextContent("Apple");
  expect(options[1]).toHaveTextContent("Banana");
  expect(options[2]).toHaveTextContent("Cherry");
});
test("should move selected item to the top of the list", () => {
  render(
    <Select
      id="test-selector"
      label="Test Select"
      options={unsortedOptions}
      isSorted={true}
    />
  );

  const toggleButton = screen.getByTestId("dropdown-toggle");

  // Open the dropdown
  fireEvent.click(toggleButton);

  // Select the second option (Cherry)
  const secondOption = screen.getAllByRole("option")[2];
  fireEvent.click(secondOption);

  // Open the dropdown again to check the new order
  fireEvent.click(toggleButton);

  // Get all options
  const updatedOptions = screen.getAllByRole("option");

  // Check that Cherry is now the first item
  expect(updatedOptions[0]).toHaveTextContent("Cherry");
  expect(updatedOptions[1]).toHaveTextContent("Apple");
  expect(updatedOptions[2]).toHaveTextContent("Banana");
});

test("should move selected item to the top of the list and the remaning should be sorted", () => {
  render(
    <Select
      id="test-selector"
      label="Test Select"
      options={unsortedOptions}
      isSorted={true}
    />
  );

  const toggleButton = screen.getByTestId("dropdown-toggle");

  // Open the dropdown
  fireEvent.click(toggleButton);

  // Select the second option (Cherry)
  const secondOption = screen.getAllByRole("option")[2];
  fireEvent.click(secondOption);

  // Open the dropdown again to check the new order
  fireEvent.click(toggleButton);

  // Get all options
  const updatedOptions = screen.getAllByRole("option");

  // Check that Cherry is now the first item
  expect(updatedOptions[0]).toHaveTextContent("Cherry");
  expect(updatedOptions[1]).toHaveTextContent("Apple");
  expect(updatedOptions[2]).toHaveTextContent("Banana");
});

test("should search the option and show it in the menu", () => {
  render(
    <Select
      id="test-selector"
      label="Test Select"
      options={unsortedOptions}
      isSorted={true}
    />
  );

  const input = screen.getByTestId("input-search");

  //focus input
  fireEvent.click(input);

  //change input value
  fireEvent.change(input, { target: { value: "Apple" } });

  const updatedOptions = screen.getAllByRole("option");
  // Check that only the "Apple" option is displayed
  expect(updatedOptions).toHaveLength(1);
  expect(updatedOptions[0]).toHaveTextContent("Apple");
});

test("applies hover styles correctly in selector input", () => {
  render(
    <Select
      id="test-selector"
      label="Test Select"
      options={unsortedOptions}
      isSorted={true}
    />
  );

  // Get the dropdown menu items
  const dropdownToggle = screen.getByTestId("dropdown-toggle");

  // Simulate hovering over the first menu item
  fireEvent.mouseOver(dropdownToggle);

  // Check if the hover styles are applied
  expect(dropdownToggle).toHaveClass("hover:rodolfo-components-shadow-custom");
});

test("applies hover styles correctly in dropdown", () => {
  render(
    <Select
      id="test-selector"
      label="Test Select"
      options={unsortedOptions}
      isSorted={true}
    />
  );

  const dropdownToggle = screen.getByTestId("dropdown-toggle");
  // Simulate hovering over the first menu item
  fireEvent.click(dropdownToggle);

  // Get the menu items
  const dropdownList = screen.getByTestId("dropdown-menu");

  // Check if the hover styles are applied
  expect(dropdownList).toHaveClass("rodolfo-components-shadow-custom");
});

test("shows border color when the menu is open", () => {
  render(
    <Select
      id="test-selector"
      label="Test Select"
      options={unsortedOptions}
      isSorted={true}
    />
  );
  const dropdownToggle = screen.getByTestId("dropdown-toggle");
  fireEvent.click(dropdownToggle);

  expect(dropdownToggle).toHaveClass("rodolfo-components-border-focus"); // Adjust this to match the correct border color class
});
