import {Icon} from "@/components/sprite-icons";
import clsx from "clsx";
import {useExploreQueryParamsStore} from "@/store/explore-query-params-store";
import {shallow} from 'zustand/shallow'


const arrayDuration = [7, 30, 60, 90, 180, 360]
export function BlockDuration() {
    const {duration: selected, setDuration} = useExploreQueryParamsStore(({duration, setDuration}) => ({duration, setDuration}), shallow)

    const toggleSelected = (duration: number) => {
        if (selected.includes(duration)) setDuration(selected.filter(item => item !== duration))
        else setDuration([...selected, duration])
    }

    return (
        <div className="flex flex-col pb-4 border-b border-[#D1D5DB] border-solid">
            <div className="mb-4">
                <h3 className="font-medium text-lg text-sapphire-blue">Duration</h3>
            </div>
            <div className="grid grid-cols-[80px_80px_80px] gap-2">
                {arrayDuration.map((duration, i) => (
                    <div
                        key={i}
                        onClick={() => toggleSelected(duration)}
                        className={clsx("relative flex items-center justify-center border-solid font-medium text-sm rounded cursor-pointer", {
                            'py-[9px] border border-marengo text-marengo': !selected.includes(duration),
                            'py-2 border-2 border-sapphire-blue text-sapphire-blue': selected.includes(duration)
                        })}
                    >
                        {duration} days
                        {selected.includes(duration) && (
                            <Icon name="check" className="absolute -top-0.5 -right-0.5 w-[18px] h-4"/>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}