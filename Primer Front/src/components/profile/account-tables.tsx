import {clsx} from "clsx";
import {Calendar} from "@/components/profile/calendar";
import {ShowSelect} from "@/components/profile/show-select";
import {TableProduct} from "@/components/profile/tables/table-product";
import {TableTransaction} from "@/components/profile/tables/table-transaction";
import {tabTypeProperties, useProfileQueryParamsStore} from "@/store/profile-query-params-store";
import {shallow} from "zustand/shallow";


export function AccountTables() {
    const {tab, setTab} = useProfileQueryParamsStore(({tab, setTab}) => ({tab, setTab}), shallow)

    return (
        <section className="account-tables">
            <div className="max-w-container mx-auto px-8 lg:px-4">
                <div className="flex mb-12 md:flex-nowrap md:overflow-x-auto md:pb-5 md:mb-10">
                    <div
                        onClick={() => setTab(tabTypeProperties.WAITING)}
                        className={clsx("px-6 pb-5 pt-4 border-b-4 border-solid text-2xl font-bold uppercase cursor-pointer lg:text-lg md:text-base md:pb-4 md:shrink-0", {
                            "border-dark-purplish-blue text-dark-purplish-blue": tab === tabTypeProperties.WAITING,
                            "border-[#D1D5DB] text-[#D1D5DB]": tab !== tabTypeProperties.WAITING
                        })}
                    >
                        Active product
                    </div>
                    <div
                        onClick={() => setTab(tabTypeProperties.PAID)}
                        className={clsx("px-6 pb-5 pt-4 border-b-4 border-solid text-2xl font-bold uppercase cursor-pointer lg:text-lg md:text-base md:pb-4 md:shrink-0", {
                            "border-dark-purplish-blue text-dark-purplish-blue": tab === tabTypeProperties.PAID,
                            "border-[#D1D5DB] text-[#D1D5DB]": tab !== tabTypeProperties.PAID
                        })}
                    >
                        Archive product
                    </div>
                    <div
                        onClick={() => setTab(tabTypeProperties.TRANSACTION)}
                        className={clsx("px-6 pb-5 pt-4 border-b-4 border-solid text-2xl font-bold uppercase cursor-pointer lg:text-lg md:text-base md:pb-4 md:shrink-0", {
                            "border-dark-purplish-blue text-dark-purplish-blue": tab === tabTypeProperties.TRANSACTION,
                            "border-[#D1D5DB] text-[#D1D5DB]": tab !== tabTypeProperties.TRANSACTION
                        })}
                    >
                        Transaction history
                    </div>
                </div>
                <div className="flex justify-between px-10 mb-10 md:px-0 md:flex-col">
                    <Calendar/>
                    <ShowSelect/>
                </div>

                {(tab === tabTypeProperties.WAITING || tab === tabTypeProperties.PAID) && (
                    <TableProduct/>
                )}
                {tab === tabTypeProperties.TRANSACTION && (
                    <TableTransaction/>
                )}

            </div>
        </section>
    )
}