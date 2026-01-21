import { addressType } from '@/sanity/schemaTypes/addressType'
import { authorType } from '@/sanity/schemaTypes/authorType'
import { blockContentType } from '@/sanity/schemaTypes/blockContentType'
import { blogCategoryType } from '@/sanity/schemaTypes/blogCategoryType'
import { blogType } from '@/sanity/schemaTypes/blogType'
import { brandType } from '@/sanity/schemaTypes/brandType'
import { categoryType } from '@/sanity/schemaTypes/categoryType'
import { orderType } from '@/sanity/schemaTypes/orderType'
import { productType } from '@/sanity/schemaTypes/productType'
import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
  blockContentType,
  blogCategoryType,
  authorType,
  blogType,
  brandType,
  categoryType,
  productType,
  addressType,
  orderType,
]

}
