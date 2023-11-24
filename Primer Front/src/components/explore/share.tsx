import {Icon} from "@/components/sprite-icons";
import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {addPaddingPage, removePaddingPage} from "@/utils";
import {inter} from "@/styles/fonts";
import Image from "next/image";
import {useRouter} from "next/router";
import {useCopyText} from "@/hooks/use-copy-text";
import {ProductGet} from "@/hooks-swr/product-get";
export function Share() {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const {product} = ProductGet({
        id: router.query.id
    })


    return (
        <>
            <button onClick={() => setOpen(true)} className="flex items-center justify-center p-4 rounded-3xl shadow-btn text-marengo sm:py-2.5 sm:mt-6 sm:shadow-none sm:border sm:border-[#D1D5DB] sm:border-solid">
                <Icon name="share" className="w-8 h-8 mr-2 sm:w-6 sm:h-6"/>
                <span className="font-semibold text-[18px] sm:text-base">Share</span>
            </button>

            <Transition show={open} as={Fragment} beforeEnter={addPaddingPage} afterLeave={removePaddingPage}>
                <Dialog as="div" className={"relative z-50 " + `${inter.variable} font-sans`} onClose={() => setOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out transition-[opacity] duration-150 sm:ease-smoothly-gentle sm:duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in transition-[opacity] duration-150 sm:ease-smoothly-gentle sm:duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed improve-performance inset-0 bg-black/[0.50] backdrop-blur" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto sm:overflow-hidden sm:static">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:block sm:p-0 sm:static">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out transition-[opacity,transform] duration-150 sm:ease-smoothly-gentle sm:transition-[transform] sm:duration-500"
                                enterFrom="opacity-0 scale-95 sm:scale-100 sm:opacity-100 sm:transform3d-y-full"
                                enterTo="opacity-100 scale-100 sm:transform3d-0"
                                leave="ease-in transition-[opacity,transform] duration-150 sm:ease-smoothly-gentle sm:transition-[transform] sm:duration-500"
                                leaveFrom="opacity-100 scale-100 sm:transform3d-0"
                                leaveTo="opacity-0 scale-95 sm:scale-100 sm:opacity-100 sm:transform3d-y-full"
                            >
                                <Dialog.Panel className="relative w-full max-w-[460px] overflow-hidden rounded-3xl bg-white py-10 px-4 shadow-xl sm:max-w-none sm:rounded-b-none sm:fixed sm:bottom-0 sm:right-0 sm:left-0">
                                    <div onClick={() => setOpen(false)} className="absolute cursor-pointer top-5 right-5">
                                        <Icon name="close" className="w-4 h-4"/>
                                    </div>

                                    <div className="flex items-center mb-10">
                                        <div className="relative w-[100px] h-[100px] shrink-0 fix-safari-bug rounded-lg overflow-hidden mr-4 m:w-20 m:h-20">
                                            <Image
                                                src={`${process.env.BASE_URL}/image/${product!.photo_url}`}
                                                alt="nft-product"
                                                width={256}
                                                height={256}
                                                className="absolute inset-0 w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <Dialog.Title
                                            as="h2"
                                            className="text-left text-lg text-sapphire-blue uppercase font-bold"
                                        >
                                            {product!.name}
                                        </Dialog.Title>
                                    </div>

                                    <div className="grid grid-cols-4 gap-6 m:grid-cols-2">
                                        <a
                                            className="group flex flex-col items-center rounded-2xl border border-solid border-[#D1D5DB] py-4 px-2 ease-out duration-100 hover:shadow-share"
                                            href={`https://twitter.com/intent/tweet?text=${encodeURI(process.env.BASE_URL_FRONTEND + router.asPath)}`}
                                            target="_blank"
                                        >
                                            <Icon name="twitter" className="w-4 h-4 text-marengo mb-1 ease-out duration-100 group-hover:text-dark-purplish-blue"/>
                                            <h3 className="text-sm font-semibold text-marengo ease-out duration-100 group-hover:text-dark-purplish-blue">Twitter</h3>
                                        </a>

                                        <a
                                            className="group flex flex-col items-center rounded-2xl border border-solid border-[#D1D5DB] py-4 px-2 ease-out duration-100 hover:shadow-share"
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(process.env.BASE_URL_FRONTEND + router.asPath)}&quote=${encodeURI('Product link')}`}
                                            target="_blank"
                                        >
                                            <Icon name="facebook" className="w-4 h-4 text-marengo mb-1 ease-out duration-100 group-hover:text-dark-purplish-blue"/>
                                            <h3 className="text-sm font-semibold text-marengo ease-out duration-100 group-hover:text-dark-purplish-blue">Facebook</h3>
                                        </a>

                                        <a
                                            className="group flex flex-col items-center rounded-2xl border border-solid border-[#D1D5DB] py-4 px-2 ease-out duration-100 hover:shadow-share"
                                            href={`https://telegram.me/share/url?url=${encodeURI(process.env.BASE_URL_FRONTEND + router.asPath)}&text=${encodeURI('Product link')}`}
                                            target="_blank"
                                        >
                                            <Icon name="telegram" className="w-4 h-4 text-marengo mb-1 ease-out duration-100 group-hover:text-dark-purplish-blue"/>
                                            <h3 className="text-sm font-semibold text-marengo ease-out duration-100 group-hover:text-dark-purplish-blue">Telegram</h3>
                                        </a>

                                        <a
                                            className="group flex flex-col items-center rounded-2xl border border-solid border-[#D1D5DB] py-4 px-2 ease-out duration-100 hover:shadow-share"
                                            href={`mailto:?subject=${encodeURI('Product link')}&body=${encodeURI(process.env.BASE_URL_FRONTEND + router.asPath)}`}
                                            target="_blank"
                                        >
                                            <Icon name="email" className="w-4 h-4 text-marengo mb-1 ease-out duration-100 group-hover:text-dark-purplish-blue"/>
                                            <h3 className="text-sm font-semibold text-marengo ease-out duration-100 group-hover:text-dark-purplish-blue">E-mail</h3>
                                        </a>
                                    </div>

                                    <CopyButton/>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

function CopyButton() {
    const router = useRouter()
    const {hasCopied, handleCopy} = useCopyText()

    return (
        <button title="copy" onClick={() => handleCopy(process.env.BASE_URL_FRONTEND + router.asPath)} className="group flex items-center justify-between w-full rounded-2xl border border-solid border-[#D1D5DB] px-5 py-3 text-sapphire-blue duration-150 ease-out hover:bg-[#f0f2f5] mt-5">
            <span className="text-ellipsis overflow-hidden whitespace-nowrap">{process.env.BASE_URL_FRONTEND + router.asPath}</span>
            {hasCopied ? (
                <Icon name="check-mark" className="w-4 h-4 text-[#24BE74]"/>
            ) : (
                <Icon name="copy" className="w-4 h-4 text-[#D1D5DB] ml-4 duration-150 ease-out group-hover:text-sapphire-blue"/>
            )}
        </button>
    )
}