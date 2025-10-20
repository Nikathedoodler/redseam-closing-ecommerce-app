"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      return saved === "true";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", isDark.toString());

      // Apply dark class to html element
      console.log("Setting theme to:", isDark ? "dark" : "light");
      const htmlElement = document.documentElement;

      if (isDark) {
        htmlElement.classList.add("dark");
        console.log(
          "Added 'dark' class to html. Current classes:",
          htmlElement.className
        );
      } else {
        htmlElement.classList.remove("dark");
        console.log(
          "Removed 'dark' class from html. Current classes:",
          htmlElement.className
        );
      }
    }
  }, [isDark]);

  const toggleTheme = () => {
    console.log("Toggling theme from:", isDark, "to:", !isDark);
    setIsDark(!isDark);
  };

  const setTheme = (dark: boolean) => {
    setIsDark(dark);
  };

  const contextValue: ThemeContextType = {
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
