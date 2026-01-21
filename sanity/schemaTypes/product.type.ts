// types/product.ts
export type SanityProduct = {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  price: number;
};
