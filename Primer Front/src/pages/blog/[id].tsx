import Head from "next/head";
import {CheckAuthentication} from "@/components/check-authentication";
import Image from 'next/image';
import {Icon} from "@/components/sprite-icons";
import useSWR, {SWRConfig} from "swr";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";
import {BlogCard, BlogType} from "@/components/cards";
import {fetcher} from "@/core-axios";
import 'react-quill/dist/quill.snow.css';
import {useCopyText} from "@/hooks/use-copy-text";
import {clsx} from "clsx";

type CurrentBlogType = {
    data: BlogType & {
        content: string,
        isBest: boolean,
        isMain: boolean,
    },
    related: BlogType[]
}

export const getServerSideProps: GetServerSideProps<{fallback: Record<string, CurrentBlogType>}> = async (context) => {
    const blogId = context.query.id as string
    let fallback: Record<string, CurrentBlogType> = {}
    if (isNaN(+blogId)) {
        return {
            notFound: true
        }
    }

    try {
        const res = await fetch(`${process.env.BASE_URL}/api/blog/${blogId}`)
        const data = await res.json();
        if (!data) {
            return {
                notFound: true
            }
        }
        fallback[`/api/blog/${blogId}`] = data

        return {
            props: {
                fallback
            }
        }
    } catch (e) {
        console.error(e)
        return {
            notFound: true
        }
    }
}

export default function CurrentBlogPage({fallback}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <SWRConfig value={{ fallback }}>
            <CurrentBlog/>
        </SWRConfig>
    )
}

function CurrentBlog() {
    const router = useRouter()
    const {data: blog} = useSWR<CurrentBlogType>(`/api/blog/${router.query.id}`, fetcher)


    return (
        <>
            <Head>
                <title>{blog!.data.title}</title>
            </Head>
            <section className="pt-36 mb-32">
                <div className="max-w-[1064px] mx-auto px-4">
                    <div className="relative overflow-hidden fix-safari-bug rounded-3xl w-full h-[400px] mb-2.5">
                        <Image
                            src={`${process.env.BASE_URL}/image/${blog!.data.banner}`}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            alt="article banner image"
                            width={1024}
                            height={1024}
                        />
                    </div>
                    <div className="flex items-center justify-between mb-5 sm:flex-col sm:items-start">
                        <div className="flex gap-2 flex-wrap mr-4">
                            {blog!.data.Category.map(item => (
                                <div
                                    key={item.id}
                                    className="py-2 px-5 font-medium text-xs border border-solid border-[#1F2937] text-[#1F2937] rounded-2xl"
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-2 text-[#323232] sm:mt-10">
                            <CopyButton/>
                            <a
                                className="flex items-center justify-center"
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(process.env.BASE_URL_FRONTEND + router.asPath)}&quote=${encodeURI(blog!.data.title)}`}
                                target="_blank"
                            >
                                <Icon name="facebook-blog" className="w-8 h-8"/>
                            </a>
                            <a
                                className="flex items-center justify-center"
                                href={`https://twitter.com/intent/tweet?text=${encodeURI(process.env.BASE_URL_FRONTEND + router.asPath)}`}
                                target="_blank"
                            >
                                <Icon name="twitter-blog" className="w-8 h-8"/>
                            </a>
                        </div>
                    </div>
                    <h1 className="text-sapphire-blue overflow-break text-5xl font-bold uppercase mb-5 sm:text-3xl m:text-2xl">{blog!.data.title}</h1>

                    <div className="ql-container ql-snow" style={{position: 'relative', width: '100%', border: 'none'}}>
                        <div className="ql-editor" data-gramm="false" style={{padding: 0}} dangerouslySetInnerHTML={{__html: blog!.data.content}}/>
                    </div>
                </div>
            </section>
            <section className="notable-articles mb-20">
                <div className="max-w-container mx-auto px-8 lg:px-4 md:px-0">
                    <div className="flex items-center justify-between mb-[104px] md:px-4 sm:flex-col sm:items-start">
                        <h2 className="text-5xl text-dark-purplish-blue uppercase font-bold xl:text-4xl md:mr-4 sm:text-[32px] sm:mb-6 m:text-2xl">
                            Related topic
                        </h2>
                        <button
                            className="w-[240px] text-lg bg-white text-dark-purplish-blue font-semibold rounded-3xl py-3.5 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 m:text-base">
                            Read more
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-10 xl:grid-cols-2 md:flex md:flex-nowrap md:overflow-x-auto md:gap-6 md:pb-4 md:pl-4">
                        {blog!.related.map(item => (
                            <BlogCard key={item.id} name='card-nft' {...item} />
                        ))}
                    </div>
                </div>
            </section>
            <CheckAuthentication/>
        </>
    )
}

function CopyButton() {
    const router = useRouter()
    const {hasCopied, handleCopy} = useCopyText()
    return (
        <button title="copy" onClick={() => handleCopy(process.env.BASE_URL_FRONTEND + router.asPath)}>
            <Icon
                name="share-blog"
                className={clsx("w-9 h-9 duration-200 ease-out", {
                    'text-[#24BE74]': hasCopied
                })}
            />
        </button>
    )
}