"use client"
import { Title } from "@/components/Title";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}
const priceArray = [
  { title: "Dưới 500.000₫", value: "0-500000" },
  { title: "500.000₫ - 1.000.000₫", value: "500000-1000000" },
  { title: "1.000.000₫ - 5.000.000₫", value: "1000000-5000000" },
  { title: "5.000.000₫ - 10.000.000₫", value: "5000000-10000000" },
  { title: "Trên 10.000.000₫", value: "10000000-100000000" },
];
const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white p-5 ">
      <Title className="text-base font-black">Giá sản phẩm</Title>
      <RadioGroup value={selectedPrice || ""} className="mt-2 space-y-1">
        {priceArray?.map((price, index) => (
          <div
            key={index}
            onClick={() => setSelectedPrice(price?.value)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={priceArray[0]?.value}
              className={`cursor-pointer ${
                selectedPrice === price?.value
                  ? "font-semibold text-shop_dark_green"
                  : "font-normal"
              } group-hover:text-black hoverEffect`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="text-sm font-medium mt-2 underline underline-offset-2 hover:text-red-600 hoverEffect"
        >
          Xóa lựa chọn
        </button>
      )}
    </div>
  );
};

export default PriceList;
