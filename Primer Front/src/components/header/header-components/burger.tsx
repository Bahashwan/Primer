import {Fragment, useRef, useState} from "react";
import Link from "next/link";
import {Icon} from "@/components/sprite-icons";
import {addPaddingPage, removePaddingPage} from "@/utils";
import {Popover, Transition} from "@headlessui/react";
import {AnimatePresence, motion} from "framer-motion";
import {useBurger, usePopupStore} from "@/store/toggle-stores";
import {AuthorizedButton} from "@/components/buttons/authorized-button";
import {StatusAuthentication, useAuthorizationStore} from "@/store/authorization-store";
import {LoadingButton} from "@/components/buttons/loading-button";
import {shallow} from 'zustand/shallow'
import {clsx} from "clsx";

export function Burger() {
    const burger = useBurger();
    const [isLanguages, setIsLanguages] = useState<boolean>(false)
    const btnAuthorized = useRef<HTMLButtonElement | null>(null)
    const btnClickPopover = useRef<boolean>(false)
    const popup = usePopupStore();
    const {status, address} = useAuthorizationStore(({status, address}) => ({status, address}), shallow)

    const callBeforeEnter = () => {
        burger.open()
        const isTrue = window.matchMedia('(max-width: 639px)').matches
        if (isTrue) addPaddingPage()
    }

    const callAfterLeave = () => {
        const isTrue = window.matchMedia('(max-width: 639px)').matches

        if (status === StatusAuthentication.LOADING) {
            burger.close()
            if (isTrue) removePaddingPage()
        }

        if (status === StatusAuthentication.NOT_AUTHENTICATION) {
            burger.close()
            if (isTrue && btnClickPopover.current) popup.open()
            if (isTrue && !btnClickPopover.current) removePaddingPage()
            btnClickPopover.current = false
        }

        if (status === StatusAuthentication.AUTHENTICATION) {
            if (isTrue && !btnClickPopover.current) removePaddingPage()

            if (btnClickPopover.current) {
                // При нажатии на авторизованную кнопку и когда анимация закрытия предыдущего попапа закончилась, мы как раз таки делаем фейк клик, чтобы вызвать следующий Popover
                btnAuthorized.current!.click()
                btnClickPopover.current = false
            } else {
                burger.close()
            }
        }

    }

    return (
        <>
            <Popover>
                <Popover.Button as="button"
                                className="hidden w-12 h-12 bg-dark-purplish-blue rounded-full items-center justify-center outline-0 lg:flex">
                    <div
                        className={clsx("burger", {
                            active: burger.isOpen
                        })}
                    >
                        <div className="line-burger"/>
                        <div className="line-burger"/>
                        <div className="line-burger"/>
                    </div>
                    {/*<Icon name="burger" className="text-white w-[20px] h-[14px]"/>*/}
                </Popover.Button>

                <Transition beforeEnter={callBeforeEnter} afterLeave={callAfterLeave}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out transition-[opacity] duration-150 sm:ease-smoothly-gentle sm:duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in transition-[opacity] duration-150 sm:ease-smoothly-gentle sm:duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >

                        <Popover.Overlay
                            className="hidden improve-performance fixed inset-0 sm:backdrop-blur sm:bg-black/[0.50] sm:block"/>
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

                        <Popover.Panel
                            className="w-[260px] px-5 py-10 absolute z-40 top-[70px] right-0 bg-white shadow-btn rounded-xl sm:w-full sm:fixed sm:top-auto sm:bottom-0 sm:rounded-b-none">
                            {({close}) => (
                                <div>
                                    <AnimatePresence initial={false} mode="wait">
                                        {!isLanguages && (
                                            <motion.ul
                                                key="no-languages"
                                                className="flex flex-col space-y-6 font-semibold mb-10 text-dark-purplish-blue"
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                                transition={{duration: 0.3}}
                                            >
                                                <li>
                                                    <Link href="/explore" className="flex items-center cursor-pointer space-x-2.5" onClick={() => close()}>
                                                        <Icon name="explore"
                                                              className="text-dark-purplish-blue w-5 h-[30px] р-5"/>
                                                        <span>Explore</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/how-it-works" className="flex items-center cursor-pointer space-x-2.5" onClick={() => close()}>
                                                        <Icon name="howItWorks"
                                                              className="text-dark-purplish-blue w-5 h-4"/>
                                                        <span>How it works</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/blog" className="flex items-center cursor-pointer space-x-2.5" onClick={() => close()}>
                                                        <Icon name="blog" className="text-dark-purplish-blue w-5 h-6"/>
                                                        <span>Blog</span>
                                                    </Link>
                                                </li>
                                                <li onClick={() => setIsLanguages(true)}
                                                    className="items-center justify-between cursor-pointer hidden md:flex">
                                                    <div className="flex items-center">
                                                        <Icon name="language"
                                                              className="fill-dark-purplish-blue w-5 h-[26px] р-5 mr-2.5"/>
                                                        <span>Languages</span>
                                                    </div>
                                                    <Icon name="arrow"
                                                          className="fill-dark-purplish-blue -rotate-90 w-3 h-3"/>
                                                </li>
                                            </motion.ul>
                                        )}
                                        {isLanguages && (
                                            <motion.div
                                                key="languages"
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                                transition={{duration: 0.3}}
                                            >
                                                <div
                                                    onClick={() => setIsLanguages(false)}
                                                    className="flex items-center pb-2.5 mb-4 border-b border-[#D1D5DB] border-solid space-x-5 cursor-pointer"
                                                >
                                                    <Icon name="arrow"
                                                          className="fill-dark-purplish-blue rotate-90 w-3 h-3"/>
                                                    <span className="font-semibold">Languages</span>
                                                </div>
                                                <ul className="flex flex-col space-y-6 font-semibold mb-10 text-dark-purplish-blue">
                                                    <li className="cursor-pointer">English</li>
                                                    <li className="cursor-pointer">Русский</li>
                                                    <li className="cursor-pointer">German</li>
                                                    <li className="cursor-pointer">日本語</li>
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <StatusButton close={close} btnClickPopover={btnClickPopover}/>
                                </div>
                            )}
                        </Popover.Panel>
                    </Transition.Child>
                </Transition>

            </Popover>


            {/*Это фейк кнопка для того, чтобы, во-первых, получить ref кнопки Popover и делать фейковый клик для открытия этого Popover, т.к в самом HeadlessUI у Popover нельзя использовать внешнее состояние, а, во-вторых, чтобы этот Popover открывался в том же месте где и Popover бургера*/}
            {address && (
                <AuthorizedButton fakeBtn={true} classesBtn="hidden w-0 h-0 absolute -z-1" ref={btnAuthorized}/>
            )}
        </>
    )
}


type StatusButtonBurgerTypeProps = {
    close: () => void,
    btnClickPopover: {
        current: boolean
    }
}
function StatusButton({close, btnClickPopover }: StatusButtonBurgerTypeProps) {
    const {status, address} = useAuthorizationStore(({status, address}) => ({status, address}), shallow)
    const popup = usePopupStore();

    return (
        <>
            {status === StatusAuthentication.LOADING && (
                <LoadingButton
                    btnClasses="w-full flex items-center justify-center bg-dark-purplish-blue text-sm text-white font-semibold rounded-3xl shadow-btn py-2.5 px-6"
                    svgClasses="animate-spin w-5 h-5"
                />
            )}
            {status === StatusAuthentication.NOT_AUTHENTICATION && (
                <button
                    onClick={() => {
                        const isTrue = window.matchMedia('(max-width: 639px)').matches
                        if (isTrue) {
                            btnClickPopover.current = true
                            close()
                        } else {
                            popup.open()
                        }
                    }}
                    className="bg-dark-purplish-blue text-white font-semibold rounded-3xl shadow-btn w-full p-2 text-sm sm:p-3 sm:text-base"
                >
                    Connect Wallet
                </button>
            )}
            {status === StatusAuthentication.AUTHENTICATION && (
                <button
                    onClick={() => {
                        btnClickPopover.current = true
                        close()
                    }}
                    className="w-full flex items-center justify-center bg-dark-purplish-blue text-sm text-white font-semibold rounded-3xl shadow-btn py-2.5 px-6"
                >
                    <span className="mr-2">{address[0] + "х" + address.slice(2,4) + "..." + address.slice(-4)}</span>
                    <Icon name="arrow-rounded" className="text-white w-2.5 h-2.5"/>
                </button>
            )}
        </>
    )
}