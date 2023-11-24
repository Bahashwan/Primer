import {Icon} from "@/components/sprite-icons";
import {useExploreQueryParamsStore} from "@/store/explore-query-params-store";
import clsx from "clsx"


export function BlockClear() {
    const {price, APR, duration, clearPrice, clearAPR, setDuration, clearAll} = useExploreQueryParamsStore()
    const isVisible = price || APR || duration.length > 0

    return (
        <div className={clsx("flex flex-col", {
            "mb-12": isVisible
        })}>

            <div className={clsx("flex flex-wrap gap-2", {
                "mb-2": isVisible
            })}>
                {price && (
                    <div className="flex items-center text-marengo text-xs font-medium py-2.5 pl-4 pr-2 border border-marengo border-solid rounded-3xl">
                        <span>{`Price: ${price[0]}-${price[1]} USDT`}</span>
                        <div onClick={clearPrice} className="flex items-center justify-center w-4 h-4 ml-2 cursor-pointer">
                            <Icon name="close" className="w-2 h-2"/>
                        </div>
                    </div>
                )}

                {APR && (
                    <div className="flex items-center text-marengo text-xs font-medium py-2.5 pl-4 pr-2 border border-marengo border-solid rounded-3xl">
                        <span>{`ARP: ${APR[0]}-${APR[1]}%`}</span>
                        <div onClick={clearAPR} className="flex items-center justify-center w-4 h-4 ml-2 cursor-pointer">
                            <Icon name="close" className="w-2 h-2"/>
                        </div>
                    </div>
                )}

                {duration.length > 0 && (
                    <div className="flex items-center text-marengo text-xs font-medium py-2.5 pl-4 pr-2 border border-marengo border-solid rounded-3xl">
                        <span>{`Duration: ${duration.join(", ")} days`}</span>
                        <div onClick={() => setDuration([])} className="flex items-center justify-center w-4 h-4 ml-2 cursor-pointer">
                            <Icon name="close" className="w-2 h-2"/>
                        </div>
                    </div>
                )}
            </div>
            {isVisible && (
                <button onClick={clearAll} className="w-full text-[#F9FAFB] font-medium text-sm rounded-[40px] py-2.5 px-8 bg-sapphire-blue duration-200 ease-out hover:bg-greyish-purplish-blue">Clear all filters</button>
            )}
        </div>
    )
}