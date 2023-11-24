import useSWR from "swr";
import {fetcher} from "@/core-axios";

export function BlogsSliderGet() {
    const { data = [] } = useSWR('/api/blog/best', fetcher)

    return {
        blogs: data
    }
}