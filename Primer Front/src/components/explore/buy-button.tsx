import {usePopupBuyStore, usePopupStore} from "@/store/toggle-stores";
import {useAuthorizationStore} from "@/store/authorization-store";
import {BuyButtonPopup} from "@/components/explore/buy-button-popup";

export function BuyButton({count}: {count: number}) {
    const buyPopup = usePopupBuyStore()
    const authorizationPopup = usePopupStore()
    const address = useAuthorizationStore(state => state.address);

    return (
        <>
            <button
                onClick={() => {
                    if (address) buyPopup.open()
                    else authorizationPopup.open()
                }}
                className="w-[240px] p-3.5 ml-2 uppercase font-semibold text-white text-[20px] bg-[#111827]/[.95] rounded-[40px] duration-200 ease-out hover:bg-greyish-purplish-blue sm:text-base sm:py-2.5 sm:w-[152px]"
            >
                Buy
            </button>
            <BuyButtonPopup count={count}/>
        </>
    )
}
