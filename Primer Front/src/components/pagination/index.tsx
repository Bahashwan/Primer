import {DOTS, usePagination} from "@/components/pagination/use-pagination";
import clsx from "clsx";
import {Dialog, Transition} from "@headlessui/react";
import {ChangeEvent, Dispatch, Fragment, SetStateAction, useRef, useState} from "react";
import {addPaddingPage, removePaddingPage} from "@/utils";
import {inter} from "@/styles/fonts";
import {Icon} from "@/components/sprite-icons";


interface PaginationType {
    onPageChange: (page: number) => void
    currentPage: number,
    totalPageCount: number,
    siblingCount?: number,
    classes?: string
}
export function Pagination({onPageChange, currentPage, totalPageCount, siblingCount = 1, classes = ''}: PaginationType): JSX.Element | null {
    const [isOpen, setPopup] = useState<boolean>(false)

    const paginationRange: (string | number)[] = usePagination({
        currentPage,
        totalPageCount,
        siblingCount
    }) || [];

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
    const onPrevious = (): void => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };
    const onNext = (): void => {
        if (currentPage < totalPageCount) onPageChange(currentPage + 1);
    };

    return (
        <>
            <ul
                className={(classes ? `${classes} ` : '') + "group flex space-x-2 text-[#4B5563] font-medium text-sm"}
            >
                <li
                    onClick={onPrevious}
                    className={clsx("w-10 h-10 flex items-center justify-center rounded-lg border border-solid border-[#D1D5DB] sm:group-[.paginate-adaptive]:w-8 sm:group-[.paginate-adaptive]:h-8 sm:group-[.paginate-adaptive]:text-xs", {
                        'opacity-50 cursor-not-allowed': currentPage === 1,
                        'cursor-pointer': currentPage > 1
                    })}
                >
                    <span className="leading-[0.6]">{"<"}</span>
                </li>
                {paginationRange.map((pageNumber, i) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li
                                key={pageNumber + i}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-solid border-[#D1D5DB] cursor-pointer sm:group-[.paginate-adaptive]:w-8 sm:group-[.paginate-adaptive]:h-8 sm:group-[.paginate-adaptive]:text-xs"
                                onClick={() => setPopup(true)}
                            >
                                {DOTS}
                            </li>
                        )
                    }

                    return (
                        <li
                            key={pageNumber}
                            className={clsx("w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer sm:group-[.paginate-adaptive]:w-8 sm:group-[.paginate-adaptive]:h-8 sm:group-[.paginate-adaptive]:text-xs", {
                                'bg-[#1F2937] text-white': currentPage === pageNumber,
                                'border border-solid border-[#D1D5DB]':  currentPage !== pageNumber
                            })}
                            onClick={() => onPageChange(pageNumber as number)}
                        >
                            {pageNumber}
                        </li>
                    )
                })}
                <li
                    onClick={onNext}
                    className={clsx("w-10 h-10 flex items-center justify-center rounded-lg border border-solid border-[#D1D5DB] sm:group-[.paginate-adaptive]:w-8 sm:group-[.paginate-adaptive]:h-8 sm:group-[.paginate-adaptive]:text-xs", {
                        'opacity-50 cursor-not-allowed': currentPage === totalPageCount,
                        'cursor-pointer': currentPage < totalPageCount
                    })}
                >
                    <span className="leading-[0.6]">{">"}</span>
                </li>
            </ul>
            <PopupChangePage
                onPageChange={onPageChange}
                isOpen={isOpen}
                setPopup={setPopup}
                totalPageCount={totalPageCount}
            />
        </>
    )
}


interface PopupChangePageProps {
    isOpen: boolean,
    setPopup: Dispatch<SetStateAction<boolean>>
    onPageChange: (page: number) => void,
    totalPageCount: number
}
function PopupChangePage({isOpen, setPopup, onPageChange, totalPageCount}: PopupChangePageProps): JSX.Element {
    const [value, setValue] = useState<string>('')
    let initialFocus = useRef<HTMLInputElement | null>(null)

    const changeValue = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = e.target.value
        if (/^(?!0)\d*$/.test(inputValue)) setValue(inputValue)
    }

    const sendValue = (): void => {
        if (+value < 1) {
            onPageChange(1)
            setPopup(false)
        } else if (+value > totalPageCount) {
            onPageChange(totalPageCount)
            setPopup(false)
        } else {
            onPageChange(+value)
            setPopup(false)
        }
    }

    return (
        <Transition
            show={isOpen}
            as={Fragment}
            beforeEnter={addPaddingPage}
            afterLeave={() => {
                removePaddingPage()
                setValue('')
            }}
        >
            <Dialog as="div" initialFocus={initialFocus} className={"relative z-50 " + `${inter.variable} font-sans`} onClose={() => setPopup(false)}>
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

                <div className="fixed inset-0 overflow-y-auto">
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
                            <Dialog.Panel className="relative w-full max-w-[460px] overflow-hidden rounded-3xl bg-white py-10 px-4 shadow-xl">
                                <button onClick={() => setPopup(false)} className="absolute cursor-pointer top-5 right-5">
                                    <Icon name="close" className="w-4 h-4"/>
                                </button>
                                <Dialog.Title
                                    as="h2"
                                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                                >
                                    Введите страницу
                                </Dialog.Title>
                                <input
                                    ref={initialFocus}
                                    value={value}
                                    onChange={changeValue}
                                    type="text"
                                    className="border border-solid border-[#D1D5DB] rounded-md px-4 py-2"
                                />
                                <div className="mt-6">
                                    <button
                                        className="bg-dark-purplish-blue rounded-md px-4 py-2 text-white duration-200 ease-out hover:bg-greyish-purplish-blue"
                                        onClick={sendValue}
                                    >
                                        Принять
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}