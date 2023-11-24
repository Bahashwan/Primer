import {ProductCard, ProductType} from "@/components/cards";
import {fetcher} from "@/core-axios";
import {Pagination} from "src/components/pagination";
import useSWR from "swr";
import {AxiosError} from "axios";
import {SelectValue, useExploreQueryParamsStore} from "@/store/explore-query-params-store";
import {shallow} from 'zustand/shallow'
import clsx from "clsx";
import {BuyButtonPopup} from "@/components/explore/buy-button-popup";
import {useIsHydrated} from "@/hooks/use-is-hydrated";
interface Products {
    max_pages: number,
    page: number,
    limit: number,
    data: ProductType[] | "loading",
    data_count: number
}

type QueryTypeProps = {
    price: null | [number, number],
    APR: null | [number, number],
    price_sort: SelectValue,
    duration: number[],
    page: number
}

const getQuery = ({price, APR, price_sort, duration, page}: QueryTypeProps): string => {
    let query = `?limit=12&page=${page}`
    if (price_sort.value) query += `&sort_order=${price_sort.value}&sort_by=price`
    if (price) query += `&price_min=${price[0]}&price_max=${price[1]}`
    if (APR) query += `&profitability_min=${APR[0]}&profitability_max=${APR[1]}`
    if (duration.length > 0) query += `&expiration=[${duration}]`
    return query
}
export function ProductList() {
    const {price, APR, price_sort, duration, page, setPage } = useExploreQueryParamsStore(({price, APR, price_sort, duration, page, setPage}) => ({price, APR, price_sort, duration, page, setPage}), shallow)
    const {data: products, error, isValidating, isLoading} = useSWR<Products, AxiosError>(`/api/product${getQuery({price, APR, price_sort, duration, page})}`, fetcher, {
        fallbackData: {
            max_pages: 1,
            page: 0,
            limit: 0,
            data: "loading",
            data_count: 0
        },
        keepPreviousData: true
    })
    const isHydrated = useIsHydrated()


    return (
        <div className="flex flex-col">
            {products!.data === "loading" ? (
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
                    {products!.data.length > 0 ? (
                        <div
                            className={clsx("grid grid-cols-auto-fill-product gap-x-6 gap-y-10 mb-16 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4", {
                                "opacity-50": isLoading
                            })}
                        >
                            {products!.data.map(item => (
                                <ProductCard key={item.id} {...item}/>
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
                <div className="flex justify-center">
                    <Pagination
                        onPageChange={page => setPage(page)}
                        currentPage={page}
                        siblingCount={window.matchMedia('(max-width: 639px)').matches ? 0 : 1}
                        totalPageCount={products!.max_pages}
                        classes="paginate-adaptive"
                    />
                </div>
            )}

            {(products!.data !== "loading" && isValidating) && (
                <div className="fixed z-10 bottom-5 right-5 flex items-center justify-center rounded-full bg-white w-10 h-10 shadow-btn">
                    <div className="animate-spin text-black">
                        <svg className="w-5 h-5" width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C17.595 28 19.1127 27.6899 20.4996 27.1285C21.5234 26.714 22.6894 27.208 23.1039 28.2319C23.5183 29.2558 23.0243 30.4218 22.0004 30.8362C20.1448 31.5874 18.1181 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 17.1046 31.1046 18 30 18C28.8954 18 28 17.1046 28 16C28 9.37258 22.6274 4 16 4Z"></path></svg>
                    </div>
                </div>
            )}
            <BuyButtonPopup count={1}/>
        </div>
    )
}