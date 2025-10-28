import { renderHook, act } from "@testing-library/react";
import { CartProvider } from "../../../components/context/CartContext";
import { useCart } from "../../../components/context/CartContext";

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  const cartItem = {
    id: 1,
    cover_image: "https://example.com/image.jpg",
    name: "Test Product",
    price: 29.99,
    selectedQuantity: 2,
    maxStock: 10,
    size: "M",
    color: "red",
  };

  test("should add items to the empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.isCartOpen).toBe(false);

    act(() => {
      result.current.addToCart(cartItem);
    });

    expect(result.current.cartItems).toEqual([cartItem]);
    expect(result.current.isCartOpen).toBe(true);
  });

  test("should add same item to the cart and increase quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(cartItem);
    });

    expect(result.current.cartItems[0].selectedQuantity).toBe(2);

    act(() => {
      result.current.addToCart(cartItem);
    });

    expect(result.current.cartItems[0].selectedQuantity).toBe(4);
    expect(result.current.isCartOpen).toBe(true);
  });

  test("should remove specific item from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(cartItem);
    });

    expect(result.current.cartItems).toEqual([cartItem]);
    expect(result.current.totalItems).toBe(2);

    act(() => {
      result.current.removeFromCart(cartItem);
    });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.totalItems).toBe(0);
  });

  test("should clear the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(cartItem);
    });

    expect(result.current.cartItems).toEqual([cartItem]);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItems).toEqual([]);
  });

  test("should increment specific item quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(cartItem);
    });

    act(() => {
      result.current.incrementQuantity(cartItem.id, cartItem.maxStock);
    });

    expect(result.current.cartItems[0].selectedQuantity).toBe(3);
  });

  test("should not increment beyond max stock", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(cartItem);
    });

    for (let i = 0; i < 8; i++) {
      act(() => {
        result.current.incrementQuantity(cartItem.id, cartItem.maxStock);
      });
    }

    expect(result.current.cartItems[0].selectedQuantity).toBe(10);

    act(() => {
      result.current.incrementQuantity(cartItem.id, cartItem.maxStock);
    });

    expect(result.current.cartItems[0].selectedQuantity).toBe(10);
  });

  test("should decrement specific item quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    // decrement when cart is empty
    act(() => {
      result.current.decrementQuantity(cartItem.id);
    });

    expect(result.current.cartItems).toEqual([]);

    // decrement when item in the cart
    act(() => {
      result.current.addToCart(cartItem);
    });
    act(() => {
      result.current.decrementQuantity(cartItem.id);
    });

    expect(result.current.cartItems[0].selectedQuantity).toBe(1);
  });
});
