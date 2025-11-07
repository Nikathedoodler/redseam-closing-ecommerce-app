import { fireEvent, render, screen } from "@testing-library/react";
import ProductListHeader from "../../../components/ui/ProductListHeader";

describe("ProductListHeader", () => {
  const productCount = {
    from: 1,
    to: 10,
    total: 100,
  };

  const setModalOpen = jest.fn();
  const setSortModalOpen = jest.fn();

  beforeEach(() => {
    setModalOpen.mockClear();
    setSortModalOpen.mockClear();
  });

  it("should render title, counts and buttons", () => {
    render(
      <ProductListHeader
        title="products"
        productCount={productCount}
        modalOpen={false}
        setModalOpen={setModalOpen}
        sortModalOpen={false}
        setSortModalOpen={setSortModalOpen}
        isDark={false}
      />
    );

    expect(screen.getByLabelText("title")).toHaveTextContent("products");
    expect(screen.getByLabelText("count")).toHaveTextContent(
      `Showing ${productCount.from}-${productCount.to} of ${productCount.total} results`
    );
    expect(screen.getByRole("button", { name: /filter/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sort by/i })
    ).toBeInTheDocument();
  });

  it("clicking of Filter button should open Filter modal and set sortModalOpen to false", () => {
    render(
      <ProductListHeader
        title="products"
        productCount={productCount}
        modalOpen={false}
        setModalOpen={setModalOpen}
        sortModalOpen={true}
        setSortModalOpen={setSortModalOpen}
        isDark={false}
      />
    );

    const filterButton = screen.getByRole("button", { name: /Filter/i });
    fireEvent.click(filterButton);

    expect(setModalOpen).toHaveBeenCalledWith(true);
    expect(setModalOpen).toHaveBeenCalledTimes(1);
    expect(setSortModalOpen).toHaveBeenCalledWith(false);
    expect(setSortModalOpen).toHaveBeenCalledTimes(1);
  });

  it("clicking of Sort by button should open Sort modal and set ModalOpen to false", () => {
    render(
      <ProductListHeader
        title="products"
        productCount={productCount}
        modalOpen={true}
        setModalOpen={setModalOpen}
        sortModalOpen={false}
        setSortModalOpen={setSortModalOpen}
        isDark={false}
      />
    );

    const sortButton = screen.getByRole("button", { name: /Sort by/i });
    fireEvent.click(sortButton);

    expect(setSortModalOpen).toHaveBeenCalledWith(true);
    expect(setSortModalOpen).toHaveBeenCalledTimes(1);
    expect(setModalOpen).toHaveBeenCalledWith(false);
    expect(setModalOpen).toHaveBeenCalledTimes(1);
  });

  it("should apply light mode classes when isDark false", () => {
    render(
      <ProductListHeader
        title="products"
        productCount={productCount}
        modalOpen={true}
        setModalOpen={setModalOpen}
        sortModalOpen={false}
        setSortModalOpen={setSortModalOpen}
        isDark={false}
      />
    );

    const header = screen.getByTestId("product-list-header");

    expect(header).toHaveClass("bg-white text-black");
  });

  it("should apply dark mode classes when isDark true", () => {
    render(
      <ProductListHeader
        title="products"
        productCount={productCount}
        modalOpen={true}
        setModalOpen={setModalOpen}
        sortModalOpen={false}
        setSortModalOpen={setSortModalOpen}
        isDark={true}
      />
    );

    const header = screen.getByTestId("product-list-header");

    expect(header).toHaveClass("bg-slate-800 text-white");
  });
});
