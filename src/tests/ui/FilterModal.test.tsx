/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from "@testing-library/react";
import FilterModal from "../../../components/ui/FilterModal";

jest.mock("../../../components/context/ThemeContext", () => ({
  useTheme: () => ({
    isDark: false,
  }),
}));

describe("FilterModal", () => {
  const handleFilter = jest.fn();
  const setFilterModalOpen = jest.fn();

  beforeEach(() => {
    handleFilter.mockClear();
    setFilterModalOpen.mockClear();
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
});
