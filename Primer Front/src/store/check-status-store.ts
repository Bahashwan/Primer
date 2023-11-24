import {create} from "zustand";


interface checkStatusState {
    loading: boolean
    addLoading: () => void
    removeLoading: () => void
}

export const useButtonVerificationStore = create<checkStatusState>((set) => ({
    loading: false,
    addLoading: () => set({ loading: true }),
    removeLoading: () => set({ loading: false }),
}))