import { Title } from "@/components/Title";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BRANDS_QUERYResult } from "@/sanity.types";
import React from "react";
interface Props {
  brands: BRANDS_QUERYResult;
  selectedBrand: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}
const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
    <div className="w-full  bg-white p-5">
      <Title className="text-base font-black">Brands</Title>
      <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
        {brands?.map((brand) => (
          <div
            key={brand?._id}
            onClick={() => setSelectedBrand((brand?.slug?.current ?? brand?._id) as string)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={(brand?.slug?.current ?? brand?._id) as string}
              id={brand?.slug?.current ?? brand?._id}
              className="rounded-sm"
            />
            <Label
              htmlFor={brand?.slug?.current ?? brand?._id}
              className={`${selectedBrand === (brand?.slug?.current ?? brand?._id) ? "font-bold text-black" : "text-gray-600"}`}
            >
              {brand?.title ?? brand?.name}
            </Label>
          </div>
        ))}
        {selectedBrand && (
          <button
            onClick={() => setSelectedBrand(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default BrandList;
