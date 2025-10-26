import { renderHook, act } from "@testing-library/react";
import {
  ThemeProvider,
  useTheme,
} from "../../../components/context/ThemeContext";

describe("ThemeContext", () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  test("toggleTheme theme swither", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <ThemeProvider>{children}</ThemeProvider>;
    };

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.isDark).toBe(false);
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.isDark).toBe(true);
  });

  test("setTheme is setting theme", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.isDark).toBe(false);
    act(() => {
      result.current.setTheme(true);
    });
    expect(result.current.isDark).toBe(true);
  });

  test("should initialize with saved theme from localStorage", () => {
    localStorage.setItem("darkMode", "true");
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.isDark).toBe(true);
  });

  test("should default to false when no theme in localStorage", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.isDark).toBe(false);
  });

  test("should save theme to localStorage when changed", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(localStorage.getItem("darkMode")).toBe("true");
  });

  test("should add dark to HTML class", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  test("should remove dark to HTML class", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);

    act(() => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
