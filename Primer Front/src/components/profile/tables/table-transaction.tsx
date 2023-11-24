import {
    DatePeriod, sortTransactionObject,
    sortTransactionTypeProperties,
    useProfileQueryParamsStore
} from "@/store/profile-query-params-store";
import {Icon} from "@/components/sprite-icons";
import {format} from "date-fns";
import {Pagination} from "src/components/pagination";
import {clsx} from "clsx";
import useSWR from "swr";
import {fetcher} from "@/core-axios";
import {shallow} from "zustand/shallow";


interface TransactionUserTable {
    max_pages: number,
    page: number,
    limit: number,
    data: TransactionUser[],
    data_count: number
}

type TransactionUser = {
    id: number,
    action: string,
    date_transaction: string,
    status: boolean,
    sum: number,
    transaction_hash: string
}

type TransactionQueryTypeProps = {
    date_period: null | DatePeriod,
    page: number,
    size: number,
    sortTransaction: sortTransactionObject
}

const getQuery = ({date_period, page, size, sortTransaction}: TransactionQueryTypeProps): string => {
    let query = `?limit=${size}&page=${page}`
    if (date_period) query += `&data_start=${format(date_period.startDate, "dd.MM.yyyy")}&data_end=${format(date_period.endDate, "dd.MM.yyyy")}`
    if (Object.entries(sortTransaction).length) {
        const [value] = Object.entries(sortTransaction)
        query += `&sort_by=${value[0]}&sort_order=${value[1]}`
    }
    return query
}

export function TableTransaction() {
    const {sizePage, date_period, pageTransaction, setPageTransaction, sortTransaction, setSortTransaction} = useProfileQueryParamsStore(({sizePage,date_period, pageTransaction, setPageTransaction, sortTransaction, setSortTransaction}) => ({sizePage, date_period, pageTransaction, setPageTransaction, sortTransaction, setSortTransaction}), shallow)

    const {data: transactions} = useSWR<TransactionUserTable>(`/api/user/transaction${getQuery({size: sizePage.size, page: pageTransaction, date_period, sortTransaction})}`, fetcher, {
        fallbackData: {
            max_pages: 1,
            page: 0,
            limit: 0,
            data: [],
            data_count: 0
        },
        keepPreviousData: true
    })


    return (
        <div className="table-products mb-24 overflow-x-auto py-10">
            <table className="w-full mb-6">
                <thead className="text-dark-purplish-blue font-semibold text-base">
                <tr className="grid grid-cols-table-transaction bg-snow-white rounded-t-3xl text-left">
                    <th className="px-6 pt-4 pb-8">
                        <div className="tooltip pb-1 border-b border-[#6B7280] border-dashed font-normal" data-tip="Подсказка">
                            <span className="font-semibold">Transaction hash</span>
                        </div>
                    </th>
                    <th className="pl-4 pt-4">
                        <div
                            className="flex items-center justify-between grow"
                        >
                            <div className="tooltip pb-1 border-b border-[#6B7280] border-dashed font-normal" data-tip="Подсказка">
                                <span className="font-semibold">Action</span>
                            </div>
                        </div>
                    </th>
                    <th className="pl-4 pt-4 font-semibold">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setSortTransaction(sortTransactionTypeProperties.ID)}
                        >
                            <div
                                className={clsx("tooltip pb-1 border-b border-dashed font-normal", {
                                    "text-[#EC4EF4] border-[#EC4EF4]": sortTransaction[sortTransactionTypeProperties.ID],
                                    "border-[#6B7280]": !sortTransaction[sortTransactionTypeProperties.ID]
                                })}
                                data-tip="Подсказка"
                            >
                                <span className="font-semibold">ID</span>
                            </div>
                            <div className="flex flex-col ml-4">
                                <Icon name="triangle" className={clsx("w-4 h-2 mb-1", {'text-[#EC4EF4]': sortTransaction[sortTransactionTypeProperties.ID] === 'desc' })}/>
                                <Icon name="triangle" className={clsx("rotate-180 w-4 h-2", {'text-[#EC4EF4]': sortTransaction[sortTransactionTypeProperties.ID] === 'asc' })}/>
                            </div>
                        </div>
                    </th>
                    <th className="pl-4 pt-4">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setSortTransaction(sortTransactionTypeProperties.SUM)}
                        >
                            <span className={clsx("pb-[5px]", {
                                "text-[#EC4EF4]": sortTransaction[sortTransactionTypeProperties.SUM]
                            })}>
                                Sum
                            </span>
                            <div className="flex flex-col ml-4">
                                <Icon name="triangle" className={clsx("w-4 h-2 mb-1", {'text-[#EC4EF4]': sortTransaction[sortTransactionTypeProperties.SUM] === 'desc' })}/>
                                <Icon name="triangle" className={clsx("rotate-180 w-4 h-2", {'text-[#EC4EF4]': sortTransaction[sortTransactionTypeProperties.SUM] === 'asc' })}/>
                            </div>
                        </div>
                    </th>
                    <th className="pl-4 pt-4 font-semibold">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setSortTransaction(sortTransactionTypeProperties.DATE)}
                        >
                            <span
                                className={clsx("pb-[5px]", {
                                    "text-[#EC4EF4]": sortTransaction[sortTransactionTypeProperties.DATE]
                                })}
                            >
                                Date
                            </span>
                            <div className="flex flex-col ml-4">
                                <Icon name="triangle" className={clsx("w-4 h-2 mb-1", {'text-[#EC4EF4]': sortTransaction[sortTransactionTypeProperties.DATE] === 'desc' })}/>
                                <Icon name="triangle" className={clsx("rotate-180 w-4 h-2", {'text-[#EC4EF4]': sortTransaction[sortTransactionTypeProperties.DATE] === 'asc' })}/>
                            </div>
                        </div>
                        <div className="text-[#6B7280] text-xs font-normal">Transaction</div>
                    </th>
                    <th className="pl-4 pt-4">
                        <div className="tooltip pb-1 border-b border-[#6B7280] border-dashed font-normal" data-tip="Подсказка">
                            <span className="font-semibold">Status</span>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody className="text-[#1F2937] font-normal text-base">
                {transactions!.data.map(el => (
                    <tr key={el.id} className="grid grid-cols-table-transaction border-b border-solid border-[#E5E7EB]">
                        <td className="pl-4 py-6">
                            {el.transaction_hash}
                        </td>
                        <td className="pl-4 py-6">
                            {el.action}
                        </td>
                        <td className="pl-4 py-6">
                            {el.id}
                        </td>
                        <td className="pl-4 py-6">
                            {el.sum}
                        </td>
                        <td className="pl-4 py-6">
                            {format(new Date(el.date_transaction), 'dd.MM.yyyy')}
                        </td>
                        <td className="pl-4 py-6">
                            {el.status ? "Success" : "Failed"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex items-center min-w-[1400px]">
                <div className="text-[#6B7280] text-sm font-normal mx-10 grow shrink-0 whitespace-nowrap">
                    Showing {(transactions!.limit * transactions!.page - transactions!.limit) + 1} to {transactions!.page * transactions!.limit} of {transactions!.data_count} entries
                </div>
                <div className="mr-10">
                    <Pagination
                        onPageChange={page => setPageTransaction(page)}
                        currentPage={pageTransaction}
                        totalPageCount={transactions!.max_pages}
                    />
                </div>
            </div>
        </div>
    )
}