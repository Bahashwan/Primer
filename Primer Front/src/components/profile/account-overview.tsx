import {HorizontalScroll} from "@/components/native-scrollbar";
import {useState} from "react";
import {Icon} from "@/components/sprite-icons";
import {UserGet} from "@/hooks-swr/user-get";
import {clsx} from "clsx";

enum UserInfoProperties {
    BALANCE = "balance",
    TOTAL_NFT = "total_nft",
    NET_PROFIT = "net_profit",
    AVERAGE_APR = "average_apr",
    TOTAL_SPENDING = "total_spending"
}


type OverviewBlockPropsType = {
    id: number,
    title: string,
    icon_name: string,
    icon_classes: string,
    get_value: UserInfoProperties,
    suffix: string
}

const array: OverviewBlockPropsType[] = [
    {
        id: 1,
        title: "TOTAL SPENDING",
        icon_name: "total-spending",
        icon_classes: "text-[#1F2937] w-[30px] h-7",
        get_value: UserInfoProperties.TOTAL_SPENDING,
        suffix: " USDT"
    },
    {
        id: 2,
        title: "TOTAL NFTs",
        icon_name: "total-nfts",
        icon_classes: "text-[#1F2937] w-[30px] h-[26px]",
        get_value: UserInfoProperties.TOTAL_NFT,
        suffix: ""
    },
    {
        id: 3,
        title: "AVERAGE APR",
        icon_name: "Average-APR",
        icon_classes: "text-[#1F2937] w-[30px] h-[30px]",
        get_value: UserInfoProperties.AVERAGE_APR,
        suffix: "%"
    },
    {
        id: 4,
        title: "NET PROFIT",
        icon_name: "total-spending",
        icon_classes: "text-[#1F2937] w-[30px] h-7",
        get_value: UserInfoProperties.NET_PROFIT,
        suffix: " USDT"
    }
]

export function AccountOverview() {
    const [show, setShow] = useState(true)
    const {data, isLoading, isValidating} = UserGet()

    return (
        <section className="account-overview pt-32">
            <div className="max-w-container mx-auto">
                <div className="flex items-center px-8 lg:px-4">
                    <h2 className="text-[#1F2937] font-bold text-2xl uppercase mr-2.5">Account Overview</h2>
                    <div onClick={() => setShow(!show)} className="cursor-pointer">
                        {show ? (
                            <Icon name="open-eye" className="text-[#1F2937] w-[22px] h-[21px]"/>
                        ) : (
                            <Icon name="closed-eye" className="text-[#1F2937] w-[22px] h-[21px]"/>
                        )}
                    </div>
                </div>
                <HorizontalScroll classes="flex space-x-6 mb-10 py-6 px-8 lg:px-4">
                    {array.map(el => {
                        return (
                            <div key={el.id} className="pl-6 pt-10 pb-6 pr-4 shadow-btn rounded-3xl border border-solid border-[#F3F4F6] min-w-[280px]">
                                <div className="flex items-center justify-center mb-2.5 w-16 h-16 rounded-full bg-[#F3F4F6]">
                                    <Icon name={el.icon_name} className={el.icon_classes}/>
                                </div>
                                <h3 className="font-medium text-[#1F2937] mb-2.5 text-xl">{el.title}</h3>
                                {isLoading ? (
                                    <div className="w-full h-[42px] rounded animate-pulse bg-[#D1D5DB]"/>
                                ) : (
                                    <div
                                        className={clsx("text-[28px] font-semibold text-[#1F2937] uppercase", {
                                            "opacity-50": isValidating
                                        })}
                                    >
                                        {show ? `${data[el.get_value]}${el.suffix}` : "***"}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </HorizontalScroll>
            </div>
        </section>
    )
}