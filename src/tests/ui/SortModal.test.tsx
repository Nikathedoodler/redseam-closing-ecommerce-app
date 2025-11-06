/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from "@testing-library/react";
import SortModal from "../../../components/ui/SortModal";

let mockIsDark = false;

jest.mock("../../../components/context/ThemeContext", () => ({
  useTheme: () => ({
    isDark: mockIsDark,
  }),
}));

describe("SortModal", () => {
  const handleSort = jest.fn();
  const setSortModalOpen = jest.fn();

  beforeEach(() => {
    handleSort.mockClear();
    setSortModalOpen.mockClear();
    mockIsDark = false;
  });

  it("should render when sortModalOpen is true", () => {
    render(
      <SortModal
        sortModalOpen={true}
        handleSort={handleSort}
        setSortModalOpen={setSortModalOpen}
      />
    );

    const sortByText = screen.getByText("Sort by");
    expect(sortByText).toBeInTheDocument();
  });

  it("should not render when sortModalOpen is false", () => {
    render(
      <SortModal
        sortModalOpen={false}
        handleSort={handleSort}
        setSortModalOpen={setSortModalOpen}
      />
    );

    expect(screen.queryByText("Sort by")).not.toBeInTheDocument();
  });

  it("New products first button should call handleSort with correct parameter", () => {
    render(
      <SortModal
        sortModalOpen={true}
        handleSort={handleSort}
        setSortModalOpen={setSortModalOpen}
      />
    );

    const createdAtButton = screen.getByLabelText("created_at");
    fireEvent.click(createdAtButton);

    expect(handleSort).toHaveBeenCalledWith("created_at");
    expect(setSortModalOpen).toHaveBeenCalledWith(false);
  });

  it("Price, low to high button should call handleSort with correct parameter", () => {
    render(
      <SortModal
        sortModalOpen={true}
        handleSort={handleSort}
        setSortModalOpen={setSortModalOpen}
      />
    );

    const priceButton = screen.getByLabelText("price");
    fireEvent.click(priceButton);

    expect(handleSort).toHaveBeenCalledWith("price");
    expect(setSortModalOpen).toHaveBeenCalledWith(false);
  });

  it("Price, high to low button should call handleSort with correct parameter", () => {
    render(
      <SortModal
        sortModalOpen={true}
        handleSort={handleSort}
        setSortModalOpen={setSortModalOpen}
      />
    );

    const priceHighToLowButton = screen.getByLabelText("-price");
    fireEvent.click(priceHighToLowButton);

    expect(handleSort).toHaveBeenCalledWith("-price");
    expect(setSortModalOpen).toHaveBeenCalledWith(false);
  });

  it("Outside click should close modal", () => {
    render(
      <SortModal
        sortModalOpen={true}
        handleSort={handleSort}
        setSortModalOpen={setSortModalOpen}
      />
    );

    fireEvent.mouseDown(document.body);
    expect(setSortModalOpen).toHaveBeenCalledWith(false);
  });

  it("Applies light mode classes when isDark is false", () => {
    const { container } = render(
      <SortModal
        sortModalOpen={true}
        handleSort={handleSort}
        setSortModalOpen={setSortModalOpen}
      />
    );

    const modal = container.querySelector("div");
    expect(modal).toHaveClass("bg-white", "text-black");
  });

  it("Applies dark mode classes when isDark is true", () => {
    mockIsDark = true;

    const { container } = render(
      <SortModal
        sortModalOpen={true}
        handleSort={handleSort}
        setSortModalOpen={setSortModalOpen}
      />
    );

    const modal = container.querySelector("div");
    expect(modal).toHaveClass("bg-slate-800", "text-white");
  });
});
