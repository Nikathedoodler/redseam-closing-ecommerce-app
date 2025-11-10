/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../../../components/ui/Cart";

// Mock the contexts used by Cart
jest.mock("../../../components/context/CartContext", () => {
  const mockUseCart = jest.fn();
  return {
    __esModule: true,
    useCart: mockUseCart,
  };
});

import { useCart } from "../../../components/context/CartContext";

jest.mock("../../../components/context/ThemeContext", () => {
  const mockUseTheme = jest.fn();
  return {
    __esModule: true,
    useTheme: mockUseTheme,
  };
});

import { useTheme } from "../../../components/context/ThemeContext";

describe("Cart UI", () => {
  const mockSetIsCartOpen = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      isCartOpen: true,
      setIsCartOpen: mockSetIsCartOpen,
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
      incrementQuantity: jest.fn(),
      decrementQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    });

    (useTheme as jest.Mock).mockReturnValue({
      isDark: false,
    });

    mockSetIsCartOpen.mockClear();
  });

  it("renders empty cart view and closes on backdrop click", () => {
    render(<Cart />);

    // Wait for empty cart message (after mount)
    expect(screen.getByText(/Ooops!/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Start Shopping/i })
    ).toBeInTheDocument();

    // Backdrop is visible, clicking it closes cart
    const backdrop = screen.getByTestId("backdrop");
    fireEvent.click(backdrop);
    expect(mockSetIsCartOpen).toHaveBeenCalledWith(false);
  });

  it("renders light mode classes when isDark is false", () => {
    render(<Cart />);

    const header = screen.getByTestId("header");
    const cart = screen.getByTestId("cart");

    expect(header).toHaveClass("bg-[#FFFFFF] text-[#10151F]");
    expect(cart).toHaveClass("bg-[#FFFFFF] text-[#10151F]");
  });

  it("renders dark mode classes when isDark is true", () => {
    (useTheme as jest.Mock).mockReturnValue({
      isDark: true,
    });

    render(<Cart />);

    const header = screen.getByTestId("header");
    const cart = screen.getByTestId("cart");

    expect(header).toHaveClass("bg-slate-800 text-white");
    expect(cart).toHaveClass("bg-slate-800 text-white");
  });

  it("main page should not scroll when cart is open and scroll when It is closed", () => {
    const { rerender } = render(<Cart />);

    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(screen.getByTestId("backdrop"));
    expect(mockSetIsCartOpen).toHaveBeenCalledWith(false);

    (useCart as jest.Mock).mockReturnValue({
      isCartOpen: false,
      setIsCartOpen: mockSetIsCartOpen,
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
      incrementQuantity: jest.fn(),
      decrementQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    });

    rerender(<Cart />);

    expect(document.body.style.overflow).toBe("unset");
  });

  it("should increment cart item", () => {
    let mockCartItems = {
      id: 123,
      maxStock: 10,
      cover_image: "/image.jpg",
      name: "shirt",
      price: 100,
      selectedQuantity: 1,
      total_price: 200,
      size: "m",
      color: "blue",
    };

    let mockIncrementQuantity = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      isCartOpen: true,
      setIsCartOpen: mockSetIsCartOpen,
      cartItems: [mockCartItems],
      totalItems: 0,
      totalPrice: 0,
      incrementQuantity: mockIncrementQuantity,
      decrementQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    const plusButton = screen.getByTestId("increment");
    expect(plusButton).toBeInTheDocument();
    fireEvent.click(plusButton);

    expect(mockIncrementQuantity).toHaveBeenCalledWith(
      mockCartItems.id,
      mockCartItems.maxStock
    );
    expect(mockIncrementQuantity).toHaveBeenCalledTimes(1);
  });

  it("should disable plus button when selected quantity equals maxStock", () => {
    let mockCartItems = {
      id: 123,
      maxStock: 10,
      cover_image: "/image.jpg",
      name: "shirt",
      price: 100,
      selectedQuantity: 10,
      total_price: 200,
      size: "m",
      color: "blue",
    };

    let mockIncrementQuantity = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      isCartOpen: true,
      setIsCartOpen: mockSetIsCartOpen,
      cartItems: [mockCartItems],
      totalItems: 0,
      totalPrice: 0,
      incrementQuantity: mockIncrementQuantity,
      decrementQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    const plusButton = screen.getByTestId("decrement");
    expect(plusButton).toBeInTheDocument();

    fireEvent.click(plusButton);
    expect(mockIncrementQuantity).not.toHaveBeenCalled();
  });

  it("should decrement cart item", () => {
    let mockCartItems = {
      id: 123,
      maxStock: 10,
      cover_image: "/image.jpg",
      name: "shirt",
      price: 100,
      selectedQuantity: 2,
      total_price: 200,
      size: "m",
      color: "blue",
    };

    let mockDecrementQuantity = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      isCartOpen: true,
      setIsCartOpen: mockSetIsCartOpen,
      cartItems: [mockCartItems],
      totalItems: 0,
      totalPrice: 0,
      incrementQuantity: jest.fn(),
      decrementQuantity: mockDecrementQuantity,
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    const minusButton = screen.getByTestId("decrement");
    expect(minusButton).toBeInTheDocument();
    fireEvent.click(minusButton);

    expect(mockDecrementQuantity).toHaveBeenCalledWith(mockCartItems.id);
    expect(mockDecrementQuantity).toHaveBeenCalledTimes(1);
  });

  it("should disable minus button when selected quantity equals 1", () => {
    let mockCartItems = {
      id: 123,
      maxStock: 10,
      cover_image: "/image.jpg",
      name: "shirt",
      price: 100,
      selectedQuantity: 1,
      total_price: 200,
      size: "m",
      color: "blue",
    };

    let mockDecrementQuantity = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      isCartOpen: true,
      setIsCartOpen: mockSetIsCartOpen,
      cartItems: [mockCartItems],
      totalItems: 0,
      totalPrice: 0,
      incrementQuantity: jest.fn(),
      decrementQuantity: mockDecrementQuantity,
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    const minusButton = screen.getByTestId("decrement");
    expect(minusButton).toBeInTheDocument();

    fireEvent.click(minusButton);
    expect(mockDecrementQuantity).not.toHaveBeenCalled();
  });

  it("should remove cart item", () => {
    let mockCartItems = {
      id: 123,
      maxStock: 10,
      cover_image: "/image.jpg",
      name: "shirt",
      price: 100,
      selectedQuantity: 3,
      total_price: 200,
      size: "m",
      color: "blue",
    };

    let mockRemoveFromCart = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      isCartOpen: true,
      setIsCartOpen: mockSetIsCartOpen,
      cartItems: [mockCartItems],
      totalItems: 0,
      totalPrice: 0,
      incrementQuantity: jest.fn(),
      decrementQuantity: jest.fn(),
      removeFromCart: mockRemoveFromCart,
    });

    render(<Cart />);

    const removeButton = screen.getByRole("button", { name: /Remove/i });
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItems);
    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
  });

  it("should call setCartIsOpen with false and close the cart", () => {
    render(<Cart />);

    // const closeButton = container.querySelector("svg") as SVGSVGElement;
    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(mockSetIsCartOpen).toHaveBeenCalledWith(false);
    expect(mockSetIsCartOpen).toHaveBeenCalledTimes(1);
  });
});
