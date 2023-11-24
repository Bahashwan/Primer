import {Fragment, useRef, forwardRef} from "react";
import Link from "next/link";
import {Popover, Transition} from "@headlessui/react";
import {Icon} from "@/components/sprite-icons";
import {addPaddingPage, removePaddingPage} from "@/utils";
import {StatusAuthentication, useAuthorizationStore} from "@/store/authorization-store";
import {WalletBalance} from "@/components/wallet-balance";
import {axiosCfg} from "@/core-axios";
import {shallow} from "zustand/shallow";
import {UserGet} from "@/hooks-swr/user-get";
import { disconnectWalletConnect } from "@/blockchain-functions/Auth";
import {useRouter} from "next/router";
import { useDisconnect } from "@thirdweb-dev/react";
import {useBurger} from "@/store/toggle-stores";

type AuthorizedButtonType = {
    classesBtn?: string
    fakeBtn?: boolean
}

export const AuthorizedButton = forwardRef<HTMLButtonElement, AuthorizedButtonType>(({classesBtn = '', fakeBtn = false}, ref) => {
    const panel = useRef<HTMLDivElement | null>(null)
    const {address, set} = useAuthorizationStore(state => ({address: state.address, set: state.set}), shallow)
    const burger = useBurger();
    const router = useRouter()
    const disconnect = useDisconnect();
    const callBeforeEnter = () => {
        const isTrue = window.matchMedia('(max-width: 639px)').matches
        if (isTrue) addPaddingPage()
    }

    const callAfterLeave = () => {
        burger.close()
        const isTrue = window.matchMedia('(max-width: 639px)').matches
        if (isTrue) removePaddingPage()
    }

    const callAfterEnter = () => {
        //Если кнопка фейк, то когда Popover открылся, самостоятельно фокусируемся на его панели благодаря tabindex
        if (fakeBtn && panel.current) panel.current!.focus()
    }


    const logout = async () => {
        try {
            await axiosCfg.get('/api/auth/logout')
            set("", StatusAuthentication.NOT_AUTHENTICATION)
            disconnect();   
            await  disconnectWalletConnect()
            burger.close()
            if (router.pathname === "/profile") await router.push("/")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Popover>
            <Popover.Button
                as="button"
                ref={ref}
                className={classesBtn}
            >
                <span className="mr-2">{address[0] + "х" + address.slice(2,4) + "..." + address.slice(-4)}</span>
                <Icon name="arrow-rounded" className="text-white w-2.5 h-2.5"/>
            </Popover.Button>

            <Transition beforeEnter={callBeforeEnter} afterEnter={callAfterEnter} afterLeave={callAfterLeave}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out transition-[opacity] duration-150 sm:ease-smoothly-gentle sm:duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in transition-[opacity] duration-150 sm:ease-smoothly-gentle sm:duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >

                    <Popover.Overlay className="hidden improve-performance fixed inset-0 sm:backdrop-blur sm:bg-black/[0.50] sm:block" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="transition transition-[opacity,transform] duration-100 ease-out sm:ease-smoothly-gentle sm:transition-[transform] sm:duration-500"
                    enterFrom="transform scale-95 opacity-0 sm:scale-100 sm:opacity-100 sm:transform3d-y-full"
                    enterTo="transform scale-100 opacity-100 sm:transform3d-0"
                    leave="transition transition-[opacity,transform] duration-75 ease-out sm:ease-smoothly-gentle sm:transition-[transform] sm:duration-500"
                    leaveFrom="transform scale-100 opacity-100 sm:transform3d-0"
                    leaveTo="transform scale-95 opacity-0 sm:scale-100 sm:opacity-100 sm:transform3d-y-full"
                >

                    <Popover.Panel ref={panel} className="w-[400px] py-8 px-4 absolute z-40 top-[70px] right-0 bg-white shadow-btn rounded-xl sm:w-full sm:fixed sm:top-auto sm:bottom-0 sm:rounded-b-none">
                        {({ close }) => (
                            <>
                                <WalletBalance/>

                                <TotalAndProfit/>

                                <div className="grid grid-cols-2 gap-2 m:grid-cols-1">
                                    <button onClick={logout} className="flex items-center justify-center bg-transparent rounded-3xl border border-solid border-sapphire-blue text-base font-semibold text-sapphire-blue px-8 py-2">
                                        <Icon name="disconnect" className="text-sapphire-blue w-4 h-4 mr-2"/>
                                        <span>Disconnect</span>
                                    </button>
                                    <Link href="/profile" onClick={() => close()} className="flex items-center justify-center bg-dark-purplish-blue rounded-3xl text-base text-center font-semibold text-white px-8 py-2">
                                        <Icon name="account" className="text-white w-4 h-4 mr-2"/>
                                        <span className="mr-2 m:mr-6">Account</span>
                                    </Link>
                                </div>
                            </>
                        )}
                    </Popover.Panel>
                </Transition.Child>
            </Transition>

        </Popover>
    )
})

AuthorizedButton.displayName = "AuthorizedButton"

function TotalAndProfit() {
    const {data, isLoading, isValidating} = UserGet()

    return (
        <>
            <div className="flex flex-col pb-1 border-b border-solid border-[#D1D5DB] mb-4">
                <div className="text-sm text-[#6B7280] font-bold">
                    Total NTFs
                </div>

                {isLoading ? (
                    <div className="text-xl text-sapphire-blue font-bold">
                        <div className="w-32 h-[28px] rounded animate-pulse bg-[#D1D5DB]"/>
                    </div>
                ) : (
                    <div className="flex items-center text-xl text-sapphire-blue font-bold">
                        <span className="mr-4">{data.total_nft}</span>
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
            </div>

            <div className="flex flex-col pb-1 border-b border-solid border-[#D1D5DB] mb-10">
                <div className="text-sm text-[#6B7280] font-bold">
                    Net profit
                </div>

                {isLoading ? (
                    <div className="text-xl text-sapphire-blue font-bold">
                        <div className="w-32 h-[28px] rounded animate-pulse bg-[#D1D5DB]"/>
                    </div>
                ) : (
                    <div className="flex items-center text-xl text-sapphire-blue font-bold">
                        <span className="mr-4">{data.net_profit} USDT</span>
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
            </div>
        </>
    )
}