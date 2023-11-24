import {create} from "zustand";

export type SelectValue = {
    id: number,
    name: string,
    value: null | 'asc' | 'desc'
}
interface ExploreQueryParamsType {
    page: number,
    duration: number[],
    price: null | [number, number],
    APR: null | [number, number],
    price_sort: SelectValue,
    setPage: (page: number) => void,
    setPriceSort: (price_sort: SelectValue) => void,
    setDuration: (duration: number[]) => void,
    setPrice: (price: [number, number]) => void,
    setAPR: (APR: [number, number]) => void,
    clearPrice: () => void,
    clearAPR: () => void,
    clearAll: () => void,
}
export const useExploreQueryParamsStore = create<ExploreQueryParamsType>((set) => ({
    page: 1,
    duration: [],
    price: null,
    APR: null,
    price_sort: { id: 1, name: 'Trending', value: null },
    setPage: (page) => set({page}),
    setPriceSort: (price_sort) => set({price_sort, page: 1}),
    setDuration: (duration) => set({ duration: duration.sort((a, b) => a - b), page: 1 }),
    setPrice: (price) => {
        if (price[0] === 0 && price[1] === 0) set({ price: null, page: 1 })
        else set({ price, page: 1 })
    },
    setAPR: (APR) => {
        if (APR[0] === 0 && APR[1] === 0) set({ APR: null, page: 1 })
        else set({ APR, page: 1 })
    },
    clearPrice: () => set({price: null, page: 1}),
    clearAPR: () => set({APR: null, page: 1}),
    clearAll: () => set({
        duration: [],
        price: null,
        APR: null,
        page: 1
    })
}))