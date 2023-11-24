import {create} from "zustand";

interface StoreType {
    productId: number | null,
    setProductId: (id: number | null) => void
}
export const useProductIdStore = create<StoreType>((set) => ({
    productId: null,
    setProductId: (id) => set({productId: id}),
}))
