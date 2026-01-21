"use client";
import React from "react";
import { useLoading } from "@/context/LoadingContext";
import { Loader2 } from "lucide-react";

const GlobalLoadingOverlay = () => {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Spinner */}
      <Loader2 className="h-12 w-12 animate-spin text-shop_light_green mb-4" />

      {/* Text */}
      <p className="text-base font-medium text-gray-800 tracking-wide">
        {loadingMessage || "Product is loading..."}
      </p>
    </div>
  );
};

export default GlobalLoadingOverlay;
