import {Pagination} from "@/components/pagination";
import {useState} from "react";
import {BlogCard} from "@/components/cards";
import {useIsHydrated} from "@/hooks/use-is-hydrated";
import {clsx} from "clsx";
import {BlogsGet} from "@/hooks-swr/blogs-get";
import {CategoriesGet} from "@/hooks-swr/categories-get";

export function BlogList() {
    const [category, setActiveCategory] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const {blogs, isValidating, isLoading, error} = BlogsGet({category, page})
    const {categories} = CategoriesGet()
    const isHydrated = useIsHydrated()

    const setMultiSelected = (id: number): void => {
        if (category.includes(id)) setActiveCategory(category.filter(i => i !== id))
        else setActiveCategory([...category, id])
    }


    return (
        <section>
            <div className="max-w-container mx-auto px-8 m:px-4">
                <h1 className="text-sapphire-blue text-5xl font-bold uppercase mb-10 lg:text-3xl m:text-2xl">Категории</h1>
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => {
                            setActiveCategory([])
                            setPage(1)
                        }}
                        className={clsx("py-2 px-5 font-medium text-xs border border-solid border-[#1F2937] rounded-2xl", {
                            'bg-dark-purplish-blue text-white': !category.length,
                            'text-[#1F2937]': category.length
                        })}
                    >
                        All
                    </button>
                    {categories.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setMultiSelected(item.id)
                                setPage(1)
                            }}
                            className={clsx("py-2 px-5 font-medium text-xs border border-solid border-[#1F2937] rounded-2xl", {
                                'bg-dark-purplish-blue text-white': category.includes(item.id),
                                'text-[#1F2937]': !category.includes(item.id)
                            })}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {blogs.data === "loading" ? (
                    <div className="flex justify-center items-center mt-10">
                        <h3 className="text-xl mr-4">{error ? "Oops, something went wrong" : "Please wait"}</h3>
                        <div className={clsx("dots flex space-x-1", {
                            'hidden': error
                        })}>
                            <div className="dot-1 w-1 h-1 bg-sapphire-blue rounded-full"/>
                            <div className="dot-2 w-1 h-1 bg-sapphire-blue rounded-full"/>
                            <div className="dot-3 w-1 h-1 bg-sapphire-blue rounded-full"/>
                        </div>
                    </div>
                ) : (
                    <>
                        {blogs.data.length > 0 ? (
                            <div
                                className={clsx("grid grid-cols-auto-blog gap-10 mb-10 m:grid-cols-auto-blog-m", {
                                    "opacity-50": isLoading
                                })}
                            >
                                {blogs.data.map(item => (
                                    <BlogCard key={item.id} name='blog-cart' {...item} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center mt-10">
                                <h3 className="text-xl">No products</h3>
                            </div>
                        )}
                    </>
                )}

                {isHydrated && (
                    <div className="flex justify-center mb-20">
                        <Pagination
                            onPageChange={(page) => setPage(page)}
                            currentPage={page}
                            totalPageCount={blogs.max_pages}
                            siblingCount={window.matchMedia('(max-width: 639px)').matches ? 0 : 1}
                            classes="paginate-adaptive"
                        />
                    </div>
                )}

                {(blogs.data !== "loading" && isValidating) && (
                    <div className="fixed z-10 bottom-5 right-5 flex items-center justify-center rounded-full bg-white w-10 h-10 shadow-btn">
                        <div className="animate-spin text-black">
                            <svg className="w-5 h-5" width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C17.595 28 19.1127 27.6899 20.4996 27.1285C21.5234 26.714 22.6894 27.208 23.1039 28.2319C23.5183 29.2558 23.0243 30.4218 22.0004 30.8362C20.1448 31.5874 18.1181 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 17.1046 31.1046 18 30 18C28.8954 18 28 17.1046 28 16C28 9.37258 22.6274 4 16 4Z"></path></svg>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}