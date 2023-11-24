import Head from "next/head";
import {Icon} from "@/components/sprite-icons";
import {Filters} from "src/components/explore/filters";
import {Fragment} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {useFilterStore} from "@/store/toggle-stores";
import {CheckAuthentication} from "@/components/check-authentication";
import {ProductList} from "@/components/explore/product-list";
import {SelectValue, useExploreQueryParamsStore} from "@/store/explore-query-params-store";
import {shallow} from 'zustand/shallow'
import {clsx} from "clsx";

export default function CatalogPage() {
    return (
        <>
            <Head>
                <title>Explore</title>
            </Head>
            <section className="catalog-NFTs pt-[118px] mb-20">
                <div className="max-w-container mx-auto px-8 lg:px-4">
                    <div className="flex items-center justify-between mb-10 sm:flex-col sm:items-stretch">
                        <h2 className="text-5xl text-dark-purplish-blue uppercase font-bold xl:text-4xl sm:text-[32px] sm:mb-6 m:text-2xl">
                            NFT<span className="lowercase">s</span>
                        </h2>
                        <div className="flex sm:grid sm:grid-cols-2 sm:gap-x-4">
                            <ButtonFilter/>
                            <SortSelect/>
                        </div>
                    </div>
                    <div className="grid grid-cols-[330px_1fr] gap-x-6 items-start md:grid-cols-1">
                        <Filters/>
                        <ProductList/>
                    </div>
                </div>
            </section>
            <CheckAuthentication/>
        </>
    )
}

function ButtonFilter() {
    const {open} = useFilterStore();
    return (
        <button onClick={() => open()} className="items-center w-[190px] text-base text-marengo font-normal py-3.5 pr-4 pl-6 rounded-[40px] border border-marengo border-solid shadow-btn mr-6 hidden md:flex sm:w-full sm:mr-0">
            <Icon name="filter" className="text-marengo w-6 h-6 mr-2.5 shrink-0"/>
            <span>Filter</span>
        </button>
    )
}


const sort: SelectValue[] = [
    { id: 1, name: 'Trending', value: null },
    { id: 2, name: 'Price low', value: "asc" },
    { id: 3, name: 'Price high', value: "desc" },
]


function SortSelect() {
    const {price_sort, setPriceSort} = useExploreQueryParamsStore(({price_sort, setPriceSort}) => ({price_sort, setPriceSort}), shallow)

    return (
        <Listbox as="div" className="relative z-1" value={price_sort} onChange={setPriceSort}>
            <Listbox.Button title={price_sort.name} className="flex items-center justify-between w-[190px] text-base text-marengo font-normal py-3.5 pr-4 pl-6 rounded-[40px] border border-marengo border-solid shadow-btn sm:w-full">
                <span className="text-ellipsis overflow-hidden whitespace-nowrap">{price_sort.name}</span>
                <Icon name="arrow-rounded" className="text-marengo w-3 h-3 ml-2.5 shrink-0"/>
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
                <Listbox.Options className="flex flex-col py-2 rounded-xl absolute top-[60px] right-0 bg-white shadow-btn">
                    {sort.map((sortItem) => (
                        <Listbox.Option className="w-[200px] flex items-center justify-between cursor-pointer rounded-lg hover:bg-[#E5E7EB] duration-300 transition-colors m-1 px-3 py-2.5" key={sortItem.id} value={sortItem}>
                            <span className="flex items-center">
                                {sortItem.name}
                                {sortItem.id !== 1 && (
                                    <Icon
                                        name="arrow-sort"
                                        className={clsx("w-3 h-3 ml-2 fill-[#374151]", {
                                            "rotate-180": sortItem.id === 3
                                        })}
                                    />
                                )}
                            </span>
                            {(price_sort.id === sortItem.id) && (
                                <div className="flex items-center justify-center w-6 h-6">
                                    <Icon name="check-mark" className="w-4 h-[11px] text-dark-purplish-blue"/>
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    )
}