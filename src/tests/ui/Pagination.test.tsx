// Renders page numbers correctly
// Page number clicks call onPageChange with correct page
// Back button works and is disabled on page 1
// Next button works and is disabled on last page
// Active page has correct styling
// Ellipsis renders when needed
// Theme classes apply correctly

import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../../../components/ui/Pagination";

describe("Pagination", () => {
  const pageChange = jest.fn();

  beforeEach(() => {
    pageChange.mockClear();
  });

  it("should render page numbers correctly", () => {
    render(
      <Pagination
        page={3}
        totalPages={10}
        onPageChange={pageChange}
        isDark={false}
      />
    );

    const pageButton = screen.getAllByLabelText("page button");
    const currentPage = screen.getByText("3");

    expect(pageButton).toHaveLength(6);

    expect(screen.getByText("1")).toBeInTheDocument(); // first page
    expect(screen.getByText("3")).toBeInTheDocument(); // Current page
    expect(screen.getByText("10")).toBeInTheDocument(); // Last page
    expect(screen.getByText("...")).toBeInTheDocument();

    expect(currentPage).toHaveClass("border-[#FF4000]", "text-[#FF4000]");
  });

  it("page number click should call onPageChange with correct page", () => {
    render(
      <Pagination
        page={3}
        totalPages={10}
        onPageChange={pageChange}
        isDark={false}
      />
    );

    const currentPage = screen.getByText("3");
    const nextPage = screen.getByText("4");
    expect(currentPage).toBeInTheDocument();
    expect(nextPage).toBeInTheDocument();

    fireEvent.click(nextPage);

    expect(pageChange).toHaveBeenCalledWith(4);
    expect(pageChange).toHaveBeenCalledTimes(1);
  });

  it("back button should call onPageChange with page - 1", () => {
    const { container } = render(
      <Pagination
        page={2}
        totalPages={10}
        onPageChange={pageChange}
        isDark={false}
      />
    );

    const backButton = container.querySelector("svg"); // First SVG is BackButton
    expect(backButton).not.toBeNull();

    if (backButton) {
      fireEvent.click(backButton);
    }

    expect(pageChange).toHaveBeenCalledWith(1);
    expect(pageChange).toHaveBeenCalledTimes(1);
  });

  it("back button should be disabled when on page 1", () => {
    const { container } = render(
      <Pagination
        page={1}
        totalPages={10}
        onPageChange={pageChange}
        isDark={false}
      />
    );

    const backButton = container.querySelector("svg") as SVGSVGElement;

    // Check disabled state - BackButton sets onClick to undefined when disabled
    expect(backButton.onclick).toBeNull();
  });

  it("next button should call onPageChange with page + 1", () => {
    const { container } = render(
      <Pagination
        page={5}
        totalPages={10}
        onPageChange={pageChange}
        isDark={false}
      />
    );

    const [backButton, nextButton] = container.querySelectorAll("svg");
    expect(nextButton).not.toBeNull();

    if (nextButton) {
      fireEvent.click(nextButton);
    }

    expect(pageChange).toHaveBeenCalledWith(6);
    expect(pageChange).toHaveBeenCalledTimes(1);
  });

  it("next button should be disabled when on page 10", () => {
    const { container } = render(
      <Pagination
        page={10}
        totalPages={10}
        onPageChange={pageChange}
        isDark={false}
      />
    );

    const [backButton, nextButton] = container.querySelectorAll("svg");

    expect(nextButton.onclick).toBeNull();
  });

  it("applies light mode classes when isDark is false", () => {
    const { container } = render(
      <Pagination
        page={10}
        totalPages={10}
        onPageChange={pageChange}
        isDark={false}
      />
    );

    const pageButton = container.querySelector("button");
    expect(pageButton).toHaveClass("text-[#212B36]");
  });

  it("applies light mode classes when isDark is true", () => {
    const { container } = render(
      <Pagination
        page={10}
        totalPages={10}
        onPageChange={pageChange}
        isDark={true}
      />
    );

    const pageButton = container.querySelector("button");
    expect(pageButton).toHaveClass("text-white");
  });
});
