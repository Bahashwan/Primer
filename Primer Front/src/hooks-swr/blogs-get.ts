import useSWR from "swr";
import {AxiosError} from "axios";
import {fetcher} from "@/core-axios";
import {BlogType} from "@/components/cards";

interface Blogs {
    max_pages: number,
    page: number,
    limit: number,
    data: BlogType[] | "loading",
    data_count: number
}

type QueryParameters = {
    category: number[],
    page: number,
}
const getQuery = ({category, page}: QueryParameters): string => {
    let query = ''
    if (typeof window !== "undefined") {
        const media = window.matchMedia('(max-width: 639px)').matches ? 4 : 9
        query = `?limit=${media}&page=${page}`
        if (category.length) {
            const categorySort = [...category].sort((a, b) => a - b)
            query += `&category=[${categorySort}]`
        }
    }
    return query
}
const initialData: Blogs = {
        max_pages: 1,
        page: 0,
        limit: 0,
        data: "loading",
        data_count: 0
}
export function BlogsGet({category, page}: QueryParameters) {
    const {data = initialData, error, isValidating, isLoading} = useSWR<Blogs, AxiosError>(`/api/blog${getQuery({category, page})}`, fetcher, {
        keepPreviousData: true
    })

    return {
        blogs: data,
        error,
        isLoading,
        isValidating
    }
}