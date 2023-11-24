import {Icon} from "@/components/sprite-icons";
import {
    DateRange,
    Range,
    RangeKeyDict
} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {Fragment, useState} from "react";
import {Transition, Popover} from "@headlessui/react";
import {format, getYear, setYear} from 'date-fns'
import {DatePeriod, useProfileQueryParamsStore} from "@/store/profile-query-params-store";
import {shallow} from "zustand/shallow";
import {useIsHydrated} from "@/hooks/use-is-hydrated";

const getFormat = (date: Date): string => {
    return format(date, 'dd.MM.yyyy')
}

export function Calendar() {
    const {date_period, setDatePeriod} = useProfileQueryParamsStore(state => ({date_period: state.date_period, setDatePeriod: state.setDatePeriod}), shallow)
    const [dateRange, setDateRange] = useState<Range>(date_period ? date_period : {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })
    const isHydrated = useIsHydrated()

    const change = (date: RangeKeyDict): void => {
        setDateRange(date.selection)
    }

    return (
        <div className="relative flex items-center md:mb-4">
            <div className="text-[#1F2937] font-normal text-lg mr-5 md:text-base">Period:</div>
            <Popover>
                <Popover.Button
                    as="button"
                    className="header-calendar relative min-w-[260px] pl-4 py-4 pr-12 border border-solid border-[#D1D5DB] rounded-lg text-[#1F2937] text-base font-normal cursor-pointer outline-0 text-left md:text-sm m:text-[13px] m:min-w-[200px] m:pr-8 m:pl-2 m:py-3"
                >
                    {isHydrated ? `${getFormat(dateRange.startDate as Date)} - ${getFormat(dateRange.endDate as Date)}` : 'Loading'}
                    <Icon name="arrow-rounded" className="text-[#1F2937] absolute top-1/2 -translate-y-1/2 right-5 w-3.5 h-2 m:right-3.5"/>
                </Popover.Button>

                <Transition
                    as={Fragment}
                    unmount={false}
                    enter="ease-out duration-100 transition-[opacity,transform]"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-100 transition-[opacity,transform]"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel unmount={false} className="calendar bg-white absolute top-16 left-0 z-[5]">
                        {({close}) => (
                            <>
                                <DateRange
                                    date={new Date()}
                                    rangeColors={['#8B5CF6']}
                                    ranges={[dateRange]}
                                    minDate={setYear(new Date(), getYear(new Date()) - 1)}
                                    maxDate={setYear(new Date(), getYear(new Date()) + 1)}
                                    showDateDisplay={false}
                                    onChange={(e) => change(e)}
                                />
                                <div className="grid grid-cols-2 gap-x-2 mt-3 mb-6 px-2.5">
                                    <button
                                        onClick={() => {
                                            setDateRange({
                                                startDate: new Date(),
                                                endDate: new Date(),
                                                key: 'selection',
                                            })
                                            setDatePeriod(null)
                                            close()
                                        }}
                                        className="flex items-center justify-center bg-transparent rounded-3xl border border-solid border-sapphire-blue text-sm font-semibold text-sapphire-blue px-8 py-2"
                                    >
                                        <span>Clear all</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setDatePeriod(dateRange as DatePeriod)
                                            close()
                                        }}
                                        className="flex items-center justify-center bg-dark-purplish-blue rounded-3xl text-sm text-center font-semibold text-white px-8 py-2"
                                    >
                                        <span>Apply</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </Popover.Panel>
                </Transition>
            </Popover>
        </div>
    )
}