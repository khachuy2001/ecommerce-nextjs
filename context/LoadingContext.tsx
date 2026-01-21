"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  setIsLoading: (loading: boolean, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoadingState] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const pathname = usePathname();

  // Reset loading when route changes
  useEffect(() => {
    setIsLoadingState(false);
    setLoadingMessage("Loading...");
  }, [pathname]);

  const setIsLoading = (loading: boolean, message: string = "Loading...") => {
    setIsLoadingState(loading);
    setLoadingMessage(message);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, loadingMessage, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};
