import useSWR from "swr";
import {fetcher} from "@/core-axios";
import {CategoryType} from "@/components/cards";


export function CategoriesGet() {
    const { data = [] } = useSWR<CategoryType[]>('/api/category', fetcher)

    return {
        categories: data
    }
}