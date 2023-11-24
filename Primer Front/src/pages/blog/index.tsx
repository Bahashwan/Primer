import Head from "next/head";
import {CheckAuthentication} from "@/components/check-authentication";
import {SliderBlog} from "@/components/blog/slider-blog";
import {BlogList} from "@/components/blog/blog-list";


export default function BlogPage() {

    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <section className="pt-40">
                <h1 className="max-w-container mx-auto px-8 text-sapphire-blue text-7xl font-bold uppercase mb-6 lg:text-5xl m:px-4 m:text-4xl">Блог</h1>
                <div className="relative w-full overflow-hidden mb-20 md:px-8 m:px-4">
                    <SliderBlog/>
                </div>
            </section>
            <BlogList/>
            <CheckAuthentication/>
        </>
    )
}