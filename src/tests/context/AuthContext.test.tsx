import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../../components/context/AuthContext";

// Mock next/navigation module
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const token = "mockToken";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("Auth Context", () => {
  beforeEach(() => {
    localStorage.clear();
    mockPush.mockClear();
  });

  test("should save token to localStorage when logged in", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login(token);
    });

    expect(localStorage.getItem("authToken")).toEqual(token);
    expect(result.current.isAuthenticated).toBe(true);
  });

  test("should remove authToken from localStorage and push route to login", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login(token);
    });

    expect(localStorage.getItem("authToken")).toEqual(token);

    act(() => {
      result.current.logout();
    });

    expect(localStorage.getItem("authToken")).toEqual(null);
    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });

  test("should check authentication", () => {
    localStorage.setItem("authToken", token);

    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.checkAuth();
    });

    expect(result.current.isAuthenticated).toBe(true);
  });
});
