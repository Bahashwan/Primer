import {Icon} from "@/components/sprite-icons";
import {Listbox, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {ShowSelectType, useProfileQueryParamsStore} from "@/store/profile-query-params-store";
import {shallow} from "zustand/shallow";

const showArray: ShowSelectType[] = [
    { id: 1, label: '5 продуктов', size: 5 },
    { id: 2, label: '10 продуктов', size: 10 },
    { id: 3, label: '15 продуктов', size: 15 },
    { id: 4, label: '20 продуктов', size: 20 },
]

export function ShowSelect() {
    const {currentShow, setShow} = useProfileQueryParamsStore(state => ({currentShow: state.sizePage, setShow: state.setSizePage}), shallow)

    return (
        <div className="flex items-center">
            <div className="text-[#1F2937] font-normal text-lg mr-5 md:text-base md:mr-[26px]">Show:</div>
            <Listbox as="div" className="relative" value={currentShow} onChange={setShow}>
                <Listbox.Button className="relative pl-4 py-4 pr-12 border border-solid border-[#D1D5DB] rounded-lg text-[#1F2937] text-base font-normal cursor-pointer outline-0 text-left md:text-sm m:text-[13px] m:pl-2 m:py-3">
                    {currentShow.label}
                    <Icon name="arrow-rounded" className="text-[#1F2937] absolute top-1/2 -translate-y-1/2 right-5 w-3.5 h-2 m:right-4"/>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100 will-change-transform"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Listbox.Options className="w-[200px] flex flex-col py-2 rounded-xl absolute top-16 right-0 bg-white shadow-btn z-[5] m:w-[180px]">
                        {showArray.map((el) => (
                            <Listbox.Option className="flex items-center justify-between cursor-pointer rounded-lg hover:bg-[#E5E7EB] duration-300 transition-colors m-1 px-3 py-2.5 m:text-sm" key={el.id} value={el}>
                                <span>{el.label}</span>
                                {(currentShow.id === el.id) && (
                                    <div className="flex items-center justify-center w-6 h-6">
                                        <Icon name="check-mark" className="w-4 h-[11px] text-dark-purplish-blue m:w-3 m:h-2"/>
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    )
}