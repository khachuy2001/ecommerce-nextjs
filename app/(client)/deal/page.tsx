import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { Title } from "@/components/Title";
import { getDealProducts } from "@/sanity/queries";
import React from "react";
import { DEAL_PRODUCTS_RESULT } from "@/sanity.types";

const page = async () => {
  // Fetch deal products (array of product objects)
  const dealProducts: DEAL_PRODUCTS_RESULT = await getDealProducts();
  // Transform to Product[]
  const products = dealProducts.map((product) => ({
    ...product,
    categories: Array.isArray(product.categories)
      ? product.categories
          .filter((cat): cat is string => typeof cat === 'string' && !!cat)
          .map((cat, idx) => ({
              _ref: '', // No ref available from title, so fallback to empty string or fetch real ref if needed
              _type: 'reference' as const,
              _weak: false,
              _key: `cat${idx}`,
              ["internalGroqTypeReferenceTo"]: "category" as const
            }))
      : undefined
  }));

  return (
    <div className="py-10 bg-shop_light_bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-1 text-base uppercase tracking-wide">
          Deal hời của tuần
        </Title>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default page;