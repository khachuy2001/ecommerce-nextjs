import Shop from "@/components/Shop";
import { Suspense } from "react";
import { getAllBrands, getCategories } from "@/sanity/queries";
import React from "react";

const categories = await getCategories();
const brands = await getAllBrands();
const ShopPage = () => {
  return (
    <div className="bg-white">
      <Suspense fallback={<div>Loading...</div>}>
        <Shop categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
};

export default ShopPage;
