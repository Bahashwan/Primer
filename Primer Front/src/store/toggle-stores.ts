import { create } from 'zustand'

interface toggleState {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const usePopupStore = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))

export const usePopupBuyStore = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))

export const useFilterStore = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))

export const useBurger = create<toggleState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))
