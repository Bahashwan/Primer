import {useState, ChangeEvent} from "react";
import {Icon} from "@/components/sprite-icons";

type CounterPropsType = {
    onChange: (value: number) => void
}

export function Counter({onChange}: CounterPropsType) {
    const [input, setInput] = useState<number | ''>(1)

    const increment = (): void => {
        let count = input as number
        if (count < 999) {
            setInput(count + 1)
            onChange(count + 1)
        }
    }

    const decrement = (): void => {
        let count = input as number
        if (count > 1) {
            setInput(count - 1)
            onChange(count - 1)
        }
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const value: string = e.target.value
        if (/^(?!0)\d*$/.test(value) && value.length <= 3) {
            setInput(value && +value)
            onChange(value === "" ? 1 : +value)
        }
    }

    const onBlur = (): void => {
        if (input === "") setInput(1)
    }

    return (
        <div className="flex items-center px-4 py-2.5 rounded-3xl border border-[#374151] border-solid text-[#374151]">
            <button onClick={decrement} className="flex items-center justify-center w-7 h-7">
                <Icon name="minus" className="w-4 h-1"/>
            </button>
            <input type="text" value={input} maxLength={3} onChange={onChangeInput} onBlur={onBlur}
                   className="w-[34px] font-normal text-lg leading-[20px] mx-3.5 text-center outline-0 select-none"/>
            <button onClick={increment} className="flex items-center justify-center w-7 h-7">
                <Icon name="plus" className="w-4 h-4"/>
            </button>
        </div>
    )
}