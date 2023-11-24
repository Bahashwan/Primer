import {Icon} from "@/components/sprite-icons";
import {RangeSlider} from "@/components/explore/range-slider";
import {useEffect, useState} from "react";
import {useExploreQueryParamsStore} from "@/store/explore-query-params-store";
import {shallow} from "zustand/shallow";

export function BlockAPR() {
    const {APR, setAPR} = useExploreQueryParamsStore(({APR, setAPR}) => ({APR, setAPR}), shallow)
    const [state, setState] = useState<[number, number]>(APR ? APR : [0, 0])

    useEffect(() => {
        if (!APR) setState([0, 0])
    }, [APR])

    return (
        <div className="flex flex-col pb-4 mb-6 border-b border-[#D1D5DB] border-solid">
            <div className="mb-6">
                <h3 className="font-medium text-lg text-sapphire-blue">APR</h3>
            </div>
            <RangeSlider value={state} onChange={setState} min={0} max={100} step={5} subtext="%"/>
            <button onClick={() => setAPR(state)} className="w-full text-[#F9FAFB] font-medium text-sm rounded-[40px] py-2.5 px-8 bg-sapphire-blue duration-200 ease-out hover:bg-greyish-purplish-blue">Apply</button>
        </div>
    )
}