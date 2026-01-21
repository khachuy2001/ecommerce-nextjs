import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { Title } from "@/components/Title";
import { getDealProducts } from "@/sanity/queries";
import React from "react";
import { Product } from "@/sanity.types";

const page = async () => {
  // Fetch deal products (array of product objects)
  const products: Product[] = await getDealProducts();

  return (
    <div className="py-10 bg-shop_light_bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-1 text-base uppercase tracking-wide">
          Deal hời của tuần
        </Title>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default page;