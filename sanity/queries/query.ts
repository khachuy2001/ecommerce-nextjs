import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type == 'brand'] | order(name asc)`);

const LATEST_BLOG_QUERY = defineQuery(
  `*[_type == 'blog' && isLatest == true]|order(name asc){
    ...,
    blogcategories[]->{
      title
    }
  }`
);
const DEAL_PRODUCTS = defineQuery(
  `*[_type == 'product' && status == 'hot'] | order(name asc){
    ...,
    "categories": categories[]->title
  }`
);
const PRODUCT_BY_SLUG_QUERY = `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  price,
  discount,
  stock,
  description,
  images[]{
    asset,
    crop,
    hotspot,
    _key
  },
  category->{
    _id,
    name
  }
}
`;
const BRAND_QUERY =
  defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  ...,
  "brandName": brand->title
}`);

const MY_ORDERS_QUERY =
  defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
    ...,
    products[]{
      ...,
      product->
    }
  }`);

const GET_ALL_BLOG = defineQuery(
  `*[_type == 'blog'] | order(publishedAt desc)[0...$quantity]{
    ...,
    blogcategories[]->{
      title
    }
  }`
);
import { groq } from 'next-sanity'
const SINGLE_BLOG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  body,
  author->{
    name,
    image
  },
  blogcategories[]->{
    title
  }
}`
export type SingleBlog = {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any // hoặc dùng SanityImage type nếu bạn có
  publishedAt: string
  excerpt?: string
  body?: any, // PortableText block
  author?: {
    name: string
    image?: any
  }
  blogcategories?: Array<{
    title: string
  }>
}
const OTHERS_BLOG_QUERY = defineQuery(`*[
  _type == "blog"
  && defined(slug.current)
  && slug.current != $slug
]|order(publishedAt desc)[0...$quantity]{
  ...,
  publishedAt,
  title,
  mainImage,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);
const BLOG_CATEGORIES = defineQuery(
  `*[_type == "blog"]{
    blogcategories[]->{
      ...
    }
  }`
);
const SEARCH_PRODUCTS_QUERY = `
  *[_type == "product" && name match $keyword] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    mainImage,
    stock
  }
`;


export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  MY_ORDERS_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  OTHERS_BLOG_QUERY,
  BLOG_CATEGORIES,
  SEARCH_PRODUCTS_QUERY
};
