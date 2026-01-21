"use client";

import HomeTabBar from "@/components/HomeTabBar";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import NoProductAvailable from "@/components/NoProductAvailable";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/sanity.types";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>(
    productType[0]?.value ?? "gadget"
  );

  const query = `*[_type == "product" && variant == $variant] | order(name desc){
  ...,
  "categories": categories[]->title
}`;

  const params = { variant: selectedTab };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: Product[] = await client.fetch(query, params);
        console.log("Selected tab:", selectedTab);
        console.log("Products from Sanity:", response);
        setProducts(response);
      } catch (error) {
        console.error("Product fetching Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10">
          <div className="space-x-2 flex items-center text-blue-600">
            <Loader2 className="w-5 h-6 animate-spin" />
            <span>Product is Loading...</span>
          </div>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;
