import {Icon} from "@/components/sprite-icons";
import {useFilterStore} from "@/store/toggle-stores";
import { Transition } from '@headlessui/react';
import {Fragment} from "react";
import {clsx} from "clsx";
import {addPaddingPage, removePaddingPage} from "@/utils";
import {BlockPrice} from "@/components/explore/filters/blocks/block-price";
import {BlockAPR} from "@/components/explore/filters/blocks/block-apr";
import {BlockDuration} from "@/components/explore/filters/blocks/block-duration";
import {BlockClear} from "@/components/explore/filters/blocks/block-clear";


export function Filters() {
    const {isOpen, close} = useFilterStore();

    return (
        <div className={clsx("md:fixed md:flex md:items-start md:justify-start md:inset-0 md:overflow-y-auto md:delay-300 md:duration-0 md:transition-[visibility] md:invisible md:z-40", {
            'md:!visible': isOpen,
            'md:!delay-[0ms]': isOpen
        })}>
            <Transition
                show={isOpen}
                as={Fragment}
                enter="ease-out transition-[opacity] duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-out transition-[opacity] duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                beforeEnter={addPaddingPage} afterLeave={removePaddingPage}
            >
                <div onClick={() => close()} className="hidden improve-performance fixed inset-0 w-full h-full md:backdrop-blur md:bg-black/[0.50] md:block" />
            </Transition>
            <div className={clsx(
                "shadow-btn bg-white border border-[#D1D5DB] border-solid rounded-3xl px-4 pt-6 pb-10 mb-[120px] md:z-30 md:top-0 md:w-full md:h-full md:mb-0 md:rounded-none md:pt-12 md:transform3d-y-full md:duration-500 md:transition-[transform] md:ease-out",
                {
                    'md:transform3d-0': isOpen
                }
            )}>
                <div onClick={() => close()} className="hidden absolute cursor-pointer top-4 right-4 md:block">
                    <Icon name="close" className="w-3 h-3"/>
                </div>
                <BlockClear/>
                <BlockPrice/>
                <BlockAPR/>
                <BlockDuration/>
            </div>
        </div>
    )
}