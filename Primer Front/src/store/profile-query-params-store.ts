import {create} from "zustand";

export type DatePeriod = {
    startDate: Date,
    endDate: Date,
    key: string
}

export type ShowSelectType = {
    id: number,
    label: string,
    size: number
}

export enum tabTypeProperties {
    WAITING = "WAITING",
    PAID = "PAID",
    TRANSACTION = "TRANSACTION"
}

type listProductProperties = 'quantity' | 'price' | 'profitability' | 'payment' | 'expiration_start' | 'expiration_days' | 'expiration_end'
export type sortProductObject = Partial<{ [key in listProductProperties]: 'asc' | 'desc' }>
export enum sortProductTypeProperties {
    QUANTITY = "quantity",
    PRICE = "price",
    APR = "profitability",
    PAYMENT = "payment",
    EXPIRATION_START = "expiration_start",
    EXPIRATION_DAYS = "expiration_days",
    EXPIRATION_END = "expiration_end",
}


type listTransactionProperties = 'id' | 'date' | 'payment'
export type sortTransactionObject = Partial<{ [key in listTransactionProperties]: 'asc' | 'desc' }>
export enum sortTransactionTypeProperties {
    ID = "id",
    DATE = "date",
    SUM = "payment",
}

interface ProfileQueryParamsType {
    date_period: null | DatePeriod
    setDatePeriod: (date: DatePeriod | null) => void,

    sizePage: ShowSelectType,
    setSizePage: (size: ShowSelectType) => void,

    tab: tabTypeProperties,
    setTab: (tab: tabTypeProperties) => void,

    pageProduct: number,
    setPageProduct: (page: number) => void,

    sortProduct: sortProductObject,
    setSortProduct: (sort: sortProductTypeProperties) => void

    pageTransaction: number,
    setPageTransaction: (page: number) => void,

    sortTransaction: sortTransactionObject
    setSortTransaction: (sort: sortTransactionTypeProperties) => void
}
export const useProfileQueryParamsStore = create<ProfileQueryParamsType>((set, get) => ({
    date_period: null,
    setDatePeriod: (date) => set({date_period: date, pageProduct: 1, pageTransaction: 1 }),
    sizePage: { id: 1, label: '5 продуктов', size: 5 },
    setSizePage: (size) => set({sizePage: size, pageProduct: 1, pageTransaction: 1 }),
    tab: tabTypeProperties.WAITING,
    setTab: (tab) => set({tab, pageProduct: 1, pageTransaction: 1}),

    // product
    pageProduct: 1,
    setPageProduct: (page) => set({pageProduct: page }),
    sortProduct: {},
    setSortProduct: (sort) => {
        let newObj: sortProductObject = {}
        const sortProduct = get().sortProduct[sort]

        if (!sortProduct) {
            newObj[sort] = 'desc'
            set({sortProduct: newObj, pageProduct: 1 })
        } else {
            if (sortProduct === 'desc') newObj[sort] = 'asc'
            set({sortProduct: newObj, pageProduct: 1})
        }
    },


    // transaction
    pageTransaction: 1,
    setPageTransaction: (page) => set({pageTransaction: page }),
    sortTransaction: {},
    setSortTransaction: (sort) => {
        let newObj: sortTransactionObject = {}
        const sortProduct = get().sortTransaction[sort]

        if (!sortProduct) {
            newObj[sort] = 'desc'
            set({sortTransaction: newObj, pageTransaction: 1 })
        } else {
            if (sortProduct === 'desc') newObj[sort] = 'asc'
            set({sortTransaction: newObj, pageTransaction: 1})
        }
    },
}))