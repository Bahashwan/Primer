import {useAuthorizationStore} from "@/store/authorization-store";
import {UserGet} from "@/hooks-swr/user-get";

export function WalletBalance() {
    const address = useAuthorizationStore(state => state.address)
    const {data, isLoading, isValidating} = UserGet()

    return (
        <>
            <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280] font-bold">Wallet balance</span>
                <div className="flex items-center bg-[#E5E7EB] rounded-2xl p-1 text-xs">
                    <span className="mr-2">{address[0] + "х" + address.slice(2,4) + "..." + address.slice(-4)}</span>
                    <div className="w-2.5 h-2.5 bg-[#059669] rounded-full"/>
                </div>
            </div>


            {isLoading ? (
                <div className="text-xl text-left text-sapphire-blue font-bold uppercase pb-1 border-b border-solid border-[#D1D5DB] mb-4">
                    <div className="w-32 h-[28px] rounded animate-pulse bg-[#D1D5DB]"/>
                </div>
            ) : (
                <div className="flex items-center text-xl text-left text-sapphire-blue font-bold uppercase pb-1 border-b border-solid border-[#D1D5DB] mb-4">
                    <span className="mr-4">{data.balance + " USDT"}</span>
                    {isValidating ? (
                        <svg className="animate-spin h-5 w-5 text-[#D1D5DB]" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                            <path className="opacity-100" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : null}
                </div>
            )}
        </>
    )
}
