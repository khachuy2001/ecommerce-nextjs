import { banner_1 } from "@/components/images";
import { Title } from "@/components/ui/text";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeBanner = () => {
  return (
    <div
      className="
        bg-[#6ba9f9]
        py-16 md:py-10
        rounded-xl
        px-8 md:px-12 lg:px-24
        flex items-center justify-between gap-10
      "
    >
      <div className="space-y-6 max-w-xl">
        <Title className="text-shop_dark_green leading-tight text-xl">
          Săn ngay deal hời <br />
          <span className="text-black font-extrabold">
            Giảm đến 50%
          </span>{" "}
          các thiết bị điện tử
        </Title>

        <Link
          href="/shop"
          className="
            inline-block
            bg-teal-500
            text-white
            px-6 py-3
            rounded-full
            text-sm font-semibold
            hover:bg-shop_light_green
            hover:text-white
            transition-all duration-300
            shadow-md
          "
        >
          Mua ngay !
        </Link>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:flex justify-end mt5">
        <Image
          src={banner_1}
          alt="banner_1"
          className="w-96 object-contain mt-5"
          priority
        />
      </div>
    </div>
  );
};

export default HomeBanner;
