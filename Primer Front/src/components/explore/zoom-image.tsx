import {Fragment, useState} from "react";
import {Icon} from "@/components/sprite-icons";
import {Dialog, Transition} from "@headlessui/react";
import {addPaddingPage, removePaddingPage} from "@/utils";
import {inter} from "@/styles/fonts";
import Image from "next/image";

type ZoomImagePropsType = {
    photo_url: string
}

export function ZoomImage({photo_url}: ZoomImagePropsType) {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <div onClick={() => setOpen(true)} className="absolute right-[29px] bottom-[29px] flex items-center justify-center w-10 h-10 text-white cursor-pointer">
                <Icon name="zoom" className="w-[30px] h-[30px]"/>
            </div>
            <Transition show={open} as={Fragment} beforeEnter={addPaddingPage} afterLeave={removePaddingPage}>
                <Dialog as="div" className={"relative z-50 " + `${inter.variable} font-sans`} onClose={() => setOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out transition-[opacity] duration-150"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in transition-[opacity] duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed improve-performance inset-0 bg-black/[0.50] backdrop-blur" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto sm:overflow-hidden">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out transition-[opacity,transform] duration-150"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in transition-[opacity,transform] duration-150"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-[800px] shadow-xl">
                                    <Image
                                        src={`${process.env.BASE_URL}/image/${photo_url}`}
                                        alt="current-nft-product"
                                        width={800}
                                        height={800}
                                        className="w-full object-cover object-center"
                                    />
                                    <button className="absolute opacity-0 w-0 h-0"/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}