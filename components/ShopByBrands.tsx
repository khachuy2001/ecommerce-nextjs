import { Title } from "@/components/Title";
import { getAllBrands } from "@/sanity/queries";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import { title } from "process";

interface Brand {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

const extraData = [
  {
    title: "Miễn phí giao hàng",
    description: "Miễn phí vận chuyển cho đơn hàng trên 1 triệu",
    icon: <Truck size={45} />,
  },
  {
    title: "Đổi trả miễn phí",
    description: "Hỗ trợ đổi trả nhanh chóng trong vòng 7 ngày",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Hỗ trợ khách hàng",
    description: "Hỗ trợ khách hàng 24/7",
    icon: <Headset size={45} />,
  },

  {
    title: "Cam kết hoàn tiền",
    description: "Chất lượng được kiểm định bởi đội ngũ của chúng tôi",
    icon: <ShieldCheck size={45} />,
  },
];
const ShopByBrands = async () => {
  const brands = await getAllBrands();
  return (
    <div className="mb-10 lg:mb-20 bg-shop_light_bg p-5 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title className="text-2xl">Thương hiệu nổi tiếng</Title>
        <Link
          href={"/shop"}
          className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_green hoverEffect"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-5">
        {brands?.map((brand) => (
          <Link
            key={brand?._id}
            href={{ pathname: "/shop", query: { brand: brand?.slug?.current  } }}
            className="bg-white w-36 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop_dark_green/20 hoverEffect"
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt="brandImage"
                width={250}
                height={250}
                className="w-32 h-20 object-contain"
              />
            )}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm shadow-shop_light_green/20 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-lightColor hover:text-shop_light_green"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect  hover:cursor-pointer">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
