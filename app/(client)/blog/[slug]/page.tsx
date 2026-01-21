import Container from '@/components/Container'

import { getSingleBlog } from '@/sanity/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { SINGLE_BLOG_QUERY } from '@/sanity/queries/query';
import { Calendar, Pencil } from 'lucide-react';
import dayjs from 'dayjs';

const SingleBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog: SINGLE_BLOG_QUERY = await getSingleBlog(slug);
  if (!blog) {
    return notFound();
  }
  return (
    <div className='py-10'>
      <Container className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
        <div className='md:col-span-3' >
          {blog?.mainImage && (
            <Image
              src={urlFor(blog?.mainImage).url()}
              alt={blog?.title || "Blog Image"}
              width={800}
              height={800}
              className="w-full max-h-125 object-cover rounded-lg"
            />
          )}
          <div>

            <div className="text-xs flex items-center gap-5 my-7">
              <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                <Pencil size={15} />
                {blog?.author?.name}
                <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
              </p>
              <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                <Calendar size={15} />
                {dayjs(blog?.publishedAt).format("MMMM D, YYYY")}
                <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
              </p>

              <div className="flex items-center relative group cursor-pointer">
                {blog?.blogcategories?.map((item: any, index: number) => (
                  <p key={index} className="font-semibold text-shop_dark_green tracking-wider uppercase">
                    {item?.title}
                  </p>
                ))}
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-5">{blog?.title}</h2>
          </div>
        </div>

      </Container>
    </div>
  )
}


export default SingleBlogPage
