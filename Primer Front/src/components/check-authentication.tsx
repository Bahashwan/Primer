import useSWR from "swr";
import {fetcher} from "@/core-axios";
import {StatusAuthentication, useAuthorizationStore} from "@/store/authorization-store";

export function CheckAuthentication() {
    const {set} = useAuthorizationStore()
    useSWR('/api/auth/check', fetcher, {
        errorRetryCount: 0,
        onSuccess: (data) => {
            set(data.address, StatusAuthentication.AUTHENTICATION)
        },
        onError: () => {
            set("", StatusAuthentication.NOT_AUTHENTICATION)
        }
    })

    return (
        <div className="absolute hidden opacity-0"/>
    )
}