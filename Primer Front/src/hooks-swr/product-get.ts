import useSWR from "swr";
import {ProductType} from "@/components/cards";
import {fetcher} from "@/core-axios";

type PropsType = {
    id: number | string | string[] | null | undefined
}

type ProductSwrType = {
    data: ProductType,
    relation: ProductType[]
}

const checkNumber = (id: string | string[] | number | null | undefined): number | null => {
    if (!id) return null
    if (typeof id === "string" || Array.isArray(id)) return isNaN(+id) ? null : +id
    return id
}

export function ProductGet({id}: PropsType) {
    const checkId = checkNumber(id)
    const {data  , isLoading, isValidating} = useSWR<ProductSwrType>(checkId ? `/api/product/${checkId}` : null, fetcher)

    return {
        product: data?.data  as ProductType,
        relation: data?.relation as ProductType[],
        isLoading,
        isValidating
    }
}