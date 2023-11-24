import useSWR from "swr";
import {fetcher} from "@/core-axios";

type UserInfo = {
    balance: string,
    total_nft: number,
    net_profit: string,
    average_apr: string,
    total_spending: string
}
export function UserGet() {
    const {data, isLoading, isValidating} = useSWR<UserInfo>("/api/user/stats", fetcher, {
        fallbackData: {
            balance: "0.00",
            total_nft: 0,
            net_profit: "0.00",
            average_apr: "0.00",
            total_spending: "0.00"
        }
    })

    return {
        data: data as UserInfo,
        isLoading,
        isValidating
    }
}