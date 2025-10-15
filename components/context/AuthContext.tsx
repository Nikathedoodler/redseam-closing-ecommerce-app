"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
};

const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();

  const checkAuth = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
      console.log(isAuthenticated, "isAuthenticated");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("authToken");
      router.push("/auth/login");
      setIsAuthenticated(false);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error signing out", error);
    } finally {
      setIsAuthenticated(false);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    setIsDropdownOpen(false);
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    isDropdownOpen,
    setIsDropdownOpen,
    login,
    logout,
    checkAuth,
  };

  return (
    <authContext.Provider value={authContextValue}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a authProvider");
  }

  return context;
};
