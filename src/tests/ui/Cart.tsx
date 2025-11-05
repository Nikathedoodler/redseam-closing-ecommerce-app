// import { render, screen, fireEvent } from "@testing-library/react";
// import Cart from "../../../components/ui/Cart";

// // Mock the contexts used by Cart
// jest.mock("../../../components/context/CartContext", () => ({
//   useCart: () => ({
//     isCartOpen: true,
//     setIsCartOpen: jest.fn(),
//     cartItems: [],
//     totalItems: 0,
//     totalPrice: 0,
//     incrementQuantity: jest.fn(),
//     decrementQuantity: jest.fn(),
//     removeFromCart: jest.fn(),
//   }),
// }));

// jest.mock("../../../components/context/ThemeContext", () => ({
//   useTheme: () => ({
//     isDark: false,
//   }),
// }));

// describe("Cart UI", () => {
//   it("renders empty cart view and closes on backdrop click", () => {
//     const { useCart } = require("../../../components/context/CartContext");
//     const mockSetIsCartOpen = jest.fn();
//     // Override mock to use spy for setIsCartOpen
//     useCart.mockReturnValue({
//       isCartOpen: true,
//       setIsCartOpen: mockSetIsCartOpen,
//       cartItems: [],
//       totalItems: 0,
//       totalPrice: 0,
//       incrementQuantity: jest.fn(),
//       decrementQuantity: jest.fn(),
//       removeFromCart: jest.fn(),
//     });

//     render(<Cart />);

//     // Wait for empty cart message (after mount)
//     expect(screen.getByText(/Ooops!/i)).toBeTruthy();

//     expect(
//       screen.getByRole("button", { name: /Start Shopping/i })
//     ).toBeTruthy();

//     // Backdrop is visible, clicking it closes cart
//     const backdrop = screen.getByTestId("backdrop");
//     fireEvent.click(backdrop);
//     expect(mockSetIsCartOpen).toHaveBeenCalledWith(false);
//   });
// });
