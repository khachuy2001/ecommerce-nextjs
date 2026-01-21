"use client";
import { headerData } from "@/constants/data";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useLoading } from "@/context/LoadingContext";

const HeaderMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsLoading } = useLoading();

  const handleNavigate = (href: string, title: string) => {
    if (href === pathname) return;
    let loadingMessage = "Loading...";
    if (title === "Home") {
      loadingMessage = "Home is loading";
    } else if (title === "Shop") {
      loadingMessage = "Product is loading";
    } else if (title === "Blog") {
      loadingMessage = "Blog is loading";
    } else if (title === "Hot Deal") {
      loadingMessage = "Hot deal is loading";
    }
    setIsLoading(true, loadingMessage);
    router.push(href);
  };

  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-7 text-sm capitalize font-semibold text-lightColor">
      {headerData.map((item) => {
        const isActive = pathname === item.href;

        return (
          <button
            key={item.title}
            onClick={() => handleNavigate(item.href, item.title)}
            className={`relative group hover:text-shop_light_green transition-colors duration-300 ${
              isActive && "text-shop_light_green"
            }`}
          >
            {item.title}

            {/* underline left */}
            <span
              className={`absolute -bottom-1 left-1/2 h-0.5 w-0 bg-shop_light_green transition-all duration-300 group-hover:left-0 group-hover:w-1/2 ${
                isActive && "left-0 w-1/2"
              }`}
            />

            {/* underline right */}
            <span
              className={`absolute -bottom-1 right-1/2 h-0.5 w-0 bg-shop_light_green transition-all duration-300 group-hover:right-0 group-hover:w-1/2 ${
                isActive && "right-0 w-1/2"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default HeaderMenu;
