import Container from '@/components/Container'
import { Title } from '@/components/Title'
import { urlFor } from '@/sanity/lib/image';
import { getAllBlogs } from '@/sanity/queries';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
type Blog = {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  publishedAt: string;
  mainImage?: any;
  blogcategories?: {
    title: string;
  }[];
};

const BlogPage = async () => {
    const blogs = await getAllBlogs(6) as Blog[];
    return (
        <div>
            <Container>
                <Title>BlogPage</Title>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                    {blogs?.map((blog) => (
                        <div key={blog?._id} className='rounded-lg overflow-hidden group'>
                            {blog?.mainImage && (
                                <div className="relative w-full h-64 overflow-hidden rounded-lg">
                                    <Image
                                        src={urlFor(blog?.mainImage).url()}
                                        alt="blogImage"
                                        fill
                                        className=" w-full max-h-80 object-cover group-hover:scale-110 hoverEffect"
                                    />
                                </div>

                            )}
                            <div className="bg-white p-5">
                                <div className="text-xs flex items-center gap-5">
                                    <div className="flex items-center relative group cursor-pointer">
                                        {blog?.blogcategories?.map((item, index: number) => (
                                            <p
                                                key={index}
                                                className="font-semibold text-shop_dark_green tracking-wider"
                                            >
                                                {item?.title}
                                            </p>
                                        ))}
                                    </div>
                                    <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                                        <Calendar size={15} />
                                        {dayjs(blog?.publishedAt).format("MMMM D, YYYY")}
                                        <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-0.5 group-hover:bg-shop_dark_green hoverEffect" />
                                    </p>
                                </div>
                                <Link
                                    href={`/blog/${blog?.slug?.current}`}
                                    className="text-base font-bold tracking-wide mt-5 line-clamp-2 hover:text-shop_dark_green hoverEffect"
                                >
                                    {blog?.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default BlogPage
