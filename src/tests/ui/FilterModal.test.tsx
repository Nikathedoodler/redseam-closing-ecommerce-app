/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from "@testing-library/react";
import FilterModal from "../../../components/ui/FilterModal";

// Create a variable to hold the theme value
let mockIsDark = false;

jest.mock("../../../components/context/ThemeContext", () => ({
  useTheme: () => ({
    isDark: mockIsDark,
  }),
}));

describe("FilterModal", () => {
  const handleFilter = jest.fn();
  const setFilterModalOpen = jest.fn();
  const setFilter = jest.fn();

  beforeEach(() => {
    handleFilter.mockClear();
    setFilterModalOpen.mockClear();
    setFilter.mockClear();
    // Reset to default (light mode)
    mockIsDark = false;
  });

  it("renders the filter modal", () => {
    render(
      <FilterModal
        modalOpen={true}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );
    expect(screen.getByText("Select Price")).toBeInTheDocument();
  });

  it("does not renders when modalOpen is false", () => {
    render(
      <FilterModal
        modalOpen={false}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );

    expect(screen.queryByText("Select Price")).not.toBeInTheDocument();
  });

  it("input change should update the state", () => {
    render(
      <FilterModal
        modalOpen={true}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );

    const inputElementFrom = screen.getByLabelText("Price from");
    const inputElementTo = screen.getByLabelText("Price to");
    fireEvent.change(inputElementFrom, { target: { value: "100" } });
    fireEvent.change(inputElementTo, { target: { value: "200" } });

    expect(inputElementFrom).toHaveValue("100");
    expect(inputElementTo).toHaveValue("200");
  });

  it("apply button should call handlefilter with correct values", () => {
    render(
      <FilterModal
        modalOpen={true}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );

    const inputElementFrom = screen.getByLabelText("Price from");
    const inputElementTo = screen.getByLabelText("Price to");
    const inputElementApply = screen.getByLabelText("apply");
    fireEvent.change(inputElementFrom, { target: { value: "200" } });
    fireEvent.change(inputElementTo, { target: { value: "300" } });
    fireEvent.click(inputElementApply);

    expect(handleFilter).toHaveBeenCalledWith({
      price_from: 200,
      price_to: 300,
    });
  });

  it("apply button should reset form (clear inputs)", () => {
    const { rerender } = render(
      <FilterModal
        modalOpen={true}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );

    const inputElementFrom = screen.getByLabelText("Price from");
    const inputElementTo = screen.getByLabelText("Price to");
    const applyButton = screen.getByLabelText("apply");

    // Type values
    fireEvent.change(inputElementFrom, { target: { value: "100" } });
    fireEvent.change(inputElementTo, { target: { value: "200" } });

    // Click Apply (this closes modal and resets form)
    fireEvent.click(applyButton);

    rerender(
      <FilterModal
        modalOpen={true}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );

    // After re-render, inputs should be cleared (value 0)
    const newInputFrom = screen.getByLabelText("Price from");
    const newInputTo = screen.getByLabelText("Price to");

    expect(newInputFrom).toHaveValue("0");
    expect(newInputTo).toHaveValue("0");
  });

  it("apply button should close modal", () => {
    render(
      <FilterModal
        modalOpen={true}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );

    const applyButton = screen.getByLabelText("apply");
    fireEvent.click(applyButton);

    // Verify that setFilterModalOpen was called with false to close the modal
    expect(setFilterModalOpen).toHaveBeenCalledWith(false);
  });

  it("outside click should close modal", () => {
    render(
      <FilterModal
        modalOpen={true}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );

    fireEvent.mouseDown(document.body);
    expect(setFilterModalOpen).toHaveBeenCalledWith(false);
  });

  it("clicking inside modal should not close it", () => {
    render(
      <FilterModal
        modalOpen={true}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );

    const modalContent = screen.getByText("Select Price");
    fireEvent.mouseDown(modalContent);

    expect(setFilterModalOpen).not.toHaveBeenCalled();
  });

  it("applies light mode classes when isDark is false", () => {
    const { container } = render(
      <FilterModal
        modalOpen={true}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );

    const modal = container.querySelector("div");

    expect(modal).toHaveClass("bg-white", "text-black");
  });

  it("applies dark mode classes when isDark is true", () => {
    mockIsDark = true;

    const { container } = render(
      <FilterModal
        modalOpen={true}
        handleFilter={handleFilter}
        setFilterModalOpen={setFilterModalOpen}
      />
    );

    const modal = container.querySelector("div");

    // Check that it has dark mode classes
    expect(modal).toHaveClass("bg-slate-800", "text-white");
  });
});
