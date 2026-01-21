import Shop from "@/components/Shop";
import { getAllBrands, getCategories } from "@/sanity/queries";
import React from "react";

const categories = await getCategories();
const brands = await getAllBrands();
const ShopPage = () => {
  return (
    <div className="bg-white">
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;
