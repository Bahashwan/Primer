import Slider from 'rc-slider';
import {cloneElement} from "react";

type RangeSliderTypeProps = {
    min: number,
    max: number,
    onChange: (value: [number, number]) => void,
    value: [number, number],
    subtext: string,
    step: number | null
}
export function RangeSlider(props: RangeSliderTypeProps) {
    return (
        <>
            <Slider
                min={props.min}
                max={props.max}
                range
                value={props.value}
                step={props.step}
                prefixCls="range-slider-chf"
                onChange={(value ) => props.onChange(value as [number, number])}
                handleRender={(node,renderProps) => {
                    return cloneElement(node, {}, (
                        <div className="tooltip-chf">
                            <div className="c-tooltip">{`${renderProps.value}${props.subtext}`}</div>
                            <div className="c-triangle"/>
                        </div>
                    ))
                }}
            />
            <div className="flex justify-between mb-6">
                <div className="text-sapphire-blue text-sm font-semibold">{`${props.value[0]}${props.subtext}`}</div>
                <div className="text-sapphire-blue text-sm font-semibold">{`${props.value[1]}${props.subtext}`}</div>
            </div>
        </>
    )
}