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

  it("renders dark mode classes when isDark is true", () => {
    (useTheme as jest.Mock).mockReturnValue({
      isDark: true,
    });

    render(<Cart />);
    const cart = screen.getByTestId("cart");

    expect(cart).toHaveClass("bg-slate-800 text-white");
  });
});
