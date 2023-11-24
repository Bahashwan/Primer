import {Icon} from "@/components/sprite-icons";
import Image from "next/image";
import useSWR from "swr";
import {fetcher} from "@/core-axios";
import { format } from 'date-fns'
import {
    DatePeriod, sortProductObject,
    sortProductTypeProperties, tabTypeProperties,
    useProfileQueryParamsStore
} from "@/store/profile-query-params-store";
import {shallow} from "zustand/shallow";
import {Pagination} from "src/components/pagination";
import {clsx} from "clsx";

interface ProductUserTable {
    max_pages: number,
    page: number,
    limit: number,
    data: ProductUser[],
    data_count: number
}

type ProductUser = {
    id: number,
    product_name: string,
    quantity: number,
    price: number,
    product_description: string,
    APR: number,
    payment: number,
    photo_url: string,
    date_buying: string,
    date_expiration: string,
    days: number,
    status: string
}

type ProductQueryTypeProps = {
    date_period: null | DatePeriod,
    page: number,
    size: number,
    sortProduct: sortProductObject,
    tab: tabTypeProperties
}

const getQuery = ({date_period, page, size, sortProduct, tab}: ProductQueryTypeProps): string => {
    let query = `?limit=${size}&page=${page}`
    if (tab === tabTypeProperties.PAID) query += `&status=${tab}`
    if (date_period) query += `&data_start=${format(date_period.startDate, "dd.MM.yyyy")}&data_end=${format(date_period.endDate, "dd.MM.yyyy")}`
    if (Object.entries(sortProduct).length) {
        const [value] = Object.entries(sortProduct)
        query += `&sort_by=${value[0]}&sort_order=${value[1]}`
    }
    return query
}

export function TableProduct() {
    const {tab,pageProduct, sizePage, date_period, sortProduct, setSortProduct, setPageProduct} = useProfileQueryParamsStore(({pageProduct, setPageProduct, sizePage,date_period, sortProduct, setSortProduct, tab}) => ({pageProduct, setPageProduct, sizePage, date_period, sortProduct, setSortProduct, tab}), shallow)
    const {data: product} = useSWR<ProductUserTable>(`/api/user/product${getQuery({size: sizePage.size, page: pageProduct, date_period, sortProduct, tab})}`, fetcher, {
        fallbackData: {
            max_pages: 1,
            page: 0,
            limit: 0,
            data: [],
            data_count: 0
        },
        keepPreviousData: true
    })

    return (
        <div className="table-products mb-24 overflow-x-auto py-10">
            <table className="w-full mb-6">
                <thead className="text-dark-purplish-blue font-semibold text-base">
                <tr className="grid grid-cols-table-products bg-snow-white rounded-t-3xl text-left">
                    <th className="px-6 pt-4 pb-8">
                        <div className="tooltip pb-1 border-b border-[#6B7280] border-dashed font-normal" data-tip="Подсказка">
                            <span className="font-semibold">Invest product</span>
                        </div>
                    </th>
                    <th className="pl-4 pt-4">
                        <div
                            onClick={() => setSortProduct(sortProductTypeProperties.QUANTITY)}
                            className="flex items-center cursor-pointer"
                        >
                            <div
                                className={clsx("tooltip pb-1 border-b border-[#6B7280] border-dashed font-normal", {
                                    "text-[#EC4EF4] border-[#EC4EF4]": sortProduct[sortProductTypeProperties.QUANTITY],
                                    "border-[#6B7280]": !sortProduct[sortProductTypeProperties.QUANTITY]
                                })}
                                data-tip="Подсказка"
                            >
                                <span className="font-semibold">
                                    Quantity
                                </span>
                            </div>
                            <div className="flex flex-col ml-4">
                                <Icon name="triangle" className={clsx("w-4 h-2 mb-1", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.QUANTITY] === 'desc' })}/>
                                <Icon name="triangle" className={clsx("rotate-180 w-4 h-2", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.QUANTITY] === 'asc' })}/>
                            </div>
                        </div>
                    </th>
                    <th className="pl-4 pt-4 font-semibold">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setSortProduct(sortProductTypeProperties.PRICE)}
                        >
                            <span className={clsx("pb-[5px]", {
                                "text-[#EC4EF4]": sortProduct[sortProductTypeProperties.PRICE]
                            })}>
                                Price
                            </span>
                            <div className="flex flex-col ml-4">
                                <Icon name="triangle" className={clsx("w-4 h-2 mb-1", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.PRICE] === 'desc' })}/>
                                <Icon name="triangle" className={clsx("rotate-180 w-4 h-2", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.PRICE] === 'asc' })}/>
                            </div>
                        </div>
                    </th>
                    <th className="pl-4 pt-4">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setSortProduct(sortProductTypeProperties.APR)}
                        >
                            <div
                                className={clsx("tooltip pb-1 border-b border-dashed font-normal", {
                                    "text-[#EC4EF4] border-[#EC4EF4]": sortProduct[sortProductTypeProperties.APR],
                                    "border-[#6B7280]": !sortProduct[sortProductTypeProperties.APR]
                                })}
                                data-tip="Подсказка"
                            >
                                <span
                                    className="font-semibold"
                                >
                                    APR
                                </span>
                            </div>
                            <div className="flex flex-col ml-4">
                                <Icon name="triangle" className={clsx("w-4 h-2 mb-1", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.APR] === 'desc' })}/>
                                <Icon name="triangle" className={clsx("rotate-180 w-4 h-2", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.APR] === 'asc' })}/>
                            </div>
                        </div>
                    </th>
                    <th className="pl-4 pt-4">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setSortProduct(sortProductTypeProperties.PAYMENT)}
                        >
                            <div
                                className={clsx("tooltip pb-1 border-b border-dashed font-normal", {
                                    "text-[#EC4EF4] border-[#EC4EF4]": sortProduct[sortProductTypeProperties.PAYMENT],
                                    "border-[#6B7280]": !sortProduct[sortProductTypeProperties.PAYMENT]
                                })}
                                data-tip="Подсказка"
                            >
                                <span className="font-semibold">Payment</span>
                            </div>
                            <div className="flex flex-col ml-4">
                                <Icon name="triangle" className={clsx("w-4 h-2 mb-1", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.PAYMENT] === 'desc' })}/>
                                <Icon name="triangle" className={clsx("rotate-180 w-4 h-2", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.PAYMENT] === 'asc' })}/>
                            </div>
                        </div>
                    </th>
                    <th className="pl-4 pt-4 font-semibold">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setSortProduct(sortProductTypeProperties.EXPIRATION_START)}
                        >
                            <span
                                className={clsx("pb-[5px]", {
                                    "text-[#EC4EF4]": sortProduct[sortProductTypeProperties.EXPIRATION_START]
                                })}
                            >
                                Date
                            </span>
                            <div className="flex flex-col ml-4">
                                <Icon name="triangle" className={clsx("w-4 h-2 mb-1", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.EXPIRATION_START] === 'desc' })}/>
                                <Icon name="triangle" className={clsx("rotate-180 w-4 h-2", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.EXPIRATION_START] === 'asc' })}/>
                            </div>
                        </div>
                        <div className="text-[#6B7280] text-xs font-normal">Buying</div>
                    </th>
                    <th className="pl-4 pt-4 font-semibold">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setSortProduct(sortProductTypeProperties.EXPIRATION_DAYS)}
                        >
                            <span
                                className={clsx("pb-[5px]", {
                                    "text-[#EC4EF4]": sortProduct[sortProductTypeProperties.EXPIRATION_DAYS]
                                })}
                            >
                                Days
                            </span>
                            <div className="flex flex-col ml-4">
                                <Icon name="triangle" className={clsx("w-4 h-2 mb-1", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.EXPIRATION_DAYS] === 'desc' })}/>
                                <Icon name="triangle" className={clsx("rotate-180 w-4 h-2", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.EXPIRATION_DAYS] === 'asc' })}/>
                            </div>
                        </div>
                        <div className="text-[#6B7280] text-xs font-normal">Осталось</div>
                    </th>
                    <th className="pl-4 pt-4 font-semibold">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setSortProduct(sortProductTypeProperties.EXPIRATION_END)}
                        >
                            <span
                                className={clsx("pb-[5px]", {
                                    "text-[#EC4EF4]": sortProduct[sortProductTypeProperties.EXPIRATION_END]
                                })}
                            >
                                Date
                            </span>
                            <div className="flex flex-col ml-4">
                                <Icon name="triangle" className={clsx("w-4 h-2 mb-1", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.EXPIRATION_END] === 'desc' })}/>
                                <Icon name="triangle" className={clsx("rotate-180 w-4 h-2", {'text-[#EC4EF4]': sortProduct[sortProductTypeProperties.EXPIRATION_END] === 'asc' })}/>
                            </div>
                        </div>
                        <div className="text-[#6B7280] text-xs font-normal">Expiration</div>
                    </th>
                    <th className="pl-4 pt-4">
                        <div className="tooltip pb-1 border-b border-[#6B7280] border-dashed font-normal" data-tip="Подсказка">
                            <span className="font-semibold">Status</span>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody className="text-[#1F2937] font-normal text-base">
                {product!.data.map(el => (
                    <tr key={el.id} className="grid grid-cols-table-products border-b border-solid border-[#E5E7EB]">
                        <td className="flex pl-6 py-2">
                            <div className="relative w-20 h-20 mr-4 overflow-hidden rounded-xl">
                                <Image
                                    src={`${process.env.BASE_URL}/image/${el.photo_url}`}
                                    alt="table-image"
                                    fill
                                    className="w-full h-auto object-cover object-center"
                                />
                            </div>
                            {el.product_name}
                        </td>
                        <td className="pl-4 py-2">
                            {el.quantity}
                            <div className="text-sm text-[#6B7280]">Stacked</div>
                        </td>
                        <td className="pl-4 py-2">
                            {el.price} USDT
                        </td>
                        <td className="pl-4 py-2">
                            {el.APR}%
                        </td>
                        <td className="pl-4 py-2">
                            {el.payment} USDT
                        </td>
                        <td className="pl-4 py-2">
                            {format(new Date(el.date_buying), 'dd.MM.yyyy')}
                        </td>
                        <td className="pl-4 py-2">
                            {el.days}
                        </td>
                        <td className="pl-4 py-2">
                            {format(new Date(el.date_expiration), 'dd.MM.yyyy')}
                        </td>
                        <td className="pl-4 py-2">
                            {el.status}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex items-center min-w-[1400px]">
                <div className="text-[#6B7280] text-sm font-normal mx-10 grow shrink-0 whitespace-nowrap">
                    Showing {(product!.limit * product!.page - product!.limit) + 1} to {product!.page * product!.limit} of {product!.data_count} entries
                </div>
                <div className="mr-10">
                    <Pagination
                        onPageChange={page => setPageProduct(page)}
                        currentPage={pageProduct}
                        totalPageCount={product!.max_pages}
                    />
                </div>
            </div>
        </div>
    )
}