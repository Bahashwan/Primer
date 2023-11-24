import axios from "axios";
export const axiosCfg = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true
})

export const fetcher = (url: string) => axiosCfg.get(url).then(res => res.data) // для useSWR
