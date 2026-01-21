import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/queries";
import React from "react";

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  if (!product?.slug?.current) return null;

  const brand = await getBrand(product.slug.current as string);

  const brandName = brand
    ? Array.isArray(brand)
      ? brand[0]?.brandName
      : (brand as any).brandName
    : null;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{product?.name}: Characteristics</AccordionTrigger>
        <AccordionContent>
          <p className="flex items-center justify-between">
            Brand:{" "}
            {brandName ? (
              <span className="font-semibold tracking-wide">{brandName}</span>
            ) : (
              <span className="text-gray-500">Unknown</span>
            )}
          </p>
         
          
          <p className="flex items-center justify-between">
            Collection: {" "}
            <span className="font-semibold tracking-wide">2025</span>
          </p>

          
          <p className="flex items-center justify-between">
            Type: {" "}
            <span className="font-semibold tracking-wide">
              {product?.variant}
            </span>
          </p>

          {/* 4. Hiển thị Trạng thái Stock chi tiết */}
          <p className="flex items-center justify-between">
            Stock: {" "}
            <span className="font-semibold tracking-wide">
              {product?.stock ? "Available" : "Out of Stock"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
