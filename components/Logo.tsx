import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link href={"/"} className="inline-flex group">
      <h2
        className={cn(
          "text-2xl font-black tracking-tighter uppercase transition-all duration-300",
          "flex items-center gap-0.5",
          className
        )}
      >
        <span className="text-shop_dark_green group-hover:text-shop_light_green transition-colors duration-300">
          Smart
        </span>

        <span 
          className={cn(
            "bg-shop_dark_green text-white px-1.5 py-0.5 rounded-md transform group-hover:bg-shop_light_green group-hover:-rotate-2 transition-all duration-300 shadow-sm",
            spanDesign
          )}
        >
          Vibe
        </span>

        <span className="w-1.5 h-1.5 rounded-full bg-shop_light_green animate-pulse ml-0.5" />
      </h2>
    </Link>
  );
};

export default Logo;