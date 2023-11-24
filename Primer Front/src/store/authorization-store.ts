import { create } from 'zustand'


export enum StatusAuthentication {
    LOADING = "loading",
    NOT_AUTHENTICATION = "not-authentication",
    AUTHENTICATION = "authentication"
}
interface AuthorizationType {
    status: StatusAuthentication
    address: string,
    set: (account: string, status: StatusAuthentication) => void
}

export const useAuthorizationStore = create<AuthorizationType>((set) => ({
    status: StatusAuthentication.LOADING,
    address: "",
    set: (account:string, status: StatusAuthentication) => set({ address: account, status: status }),
}))