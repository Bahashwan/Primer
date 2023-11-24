import {clsx} from "clsx";
import {useEffect, useRef, useState, MouseEvent, RefObject} from "react";
import {KeenSliderInstance} from "keen-slider";
import {useKeenSlider} from "keen-slider/react";
import {ProductCard} from "@/components/cards";
import {Icon} from "@/components/sprite-icons";
import {list} from "@/components/landing-sections/featured-nfts"




export function Slider() {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        mode: "free-snap",
        slides: {
            perView: 3.6,
            spacing: 40,
        },
        breakpoints: {
            "(max-width: 1650px)": {
                slides: { perView: 3.2, spacing: 40, },
            },
            "(max-width: 1400px)": {
                slides: { perView: 2.6, spacing: 40, },
            },
            "(max-width: 1279px)": {
                slides: { perView: 1.8, spacing: 40, },
            },
            "(max-width: 1200px)": {
                slides: { perView: 1.4, spacing: 40, },
            },
            "(max-width: 1023px)": {
                slides: { perView: "auto", spacing: 24, },
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        optionsChanged(e) {
            e.track.init(0)
        }
    })

    return (
        <div className="navigation-wrapper relative w-full h-full overflow-hidden">
            <div ref={sliderRef} className="keen-slider">
                {list.map((item, i) => (
                    <div key={i} className="keen-slider__slide shadow-none lg:min-w-[280px]">
                        <ProductCard {...item} />
                    </div>
                ))}
            </div>
            <div className="mt-4 m:pr-4">
                <Scrollbar instanceRef={instanceRef}/>
            </div>
            {loaded && instanceRef.current && (
                <>
                    <Arrow
                        onClick={(e: MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation();
                            if (currentSlide > 0) instanceRef.current?.prev()
                        }}
                        disabled={currentSlide === 0}
                    />
                    <Arrow
                        isRight
                        onClick={(e: MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation();
                            if (currentSlide < instanceRef.current!.track.details.maxIdx) instanceRef.current?.next()
                        }}
                        disabled={
                            currentSlide === instanceRef.current!.track.details.maxIdx
                        }
                    />
                </>
            )}
        </div>
    )
}

type ArrowType = {
    isRight?: boolean,
    onClick: (e: MouseEvent<HTMLDivElement>) => void,
    disabled: boolean
}

function Arrow({isRight, onClick, disabled}: ArrowType) {

    return (
        <>
            {!disabled && (
                <div className={clsx(
                    "absolute -translate-y-2/4 top-2/4 w-10 h-10 flex items-center justify-center bg-white/[0.75] rounded cursor-pointer m:hidden",
                    {
                        "left-0": !isRight,
                        "rotate-180 right-0": isRight,
                    }
                )}
                     onClick={onClick}
                >
                    <Icon name="thin-arrow" className="text-dark-purplish-blue w-[12px] h-[22px]"/>
                </div>
            )}
        </>
    )
}

type ScrollbarType = {
    instanceRef: RefObject<KeenSliderInstance>
}

function Scrollbar({instanceRef}: ScrollbarType) {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const thumbRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateThumb = () => {
            if (!instanceRef.current || !trackRef.current || !thumbRef.current) return;
            const { width: trackWidth } = trackRef.current!.getBoundingClientRect();
            const { slides, progress } = instanceRef.current.track.details;
            const thumbWidth = trackWidth / slides.length;
            const thumbPosition = Math.max(0, Math.min(trackWidth - thumbWidth, progress * (trackWidth - thumbWidth)));
            thumbRef.current!.style.width = `${thumbWidth}px`;
            thumbRef.current!.style.transform = `translate3d(${thumbPosition}px, 0, 0)`;
        };

        if (instanceRef.current) instanceRef.current.on('detailsChanged', updateThumb);
        updateThumb();
    }, []);

    return (
        <div ref={trackRef} className="relative mx-auto w-[340px] h-1.5 rounded bg-[#D1D5DB] overflow-hidden m:w-full">
            <div ref={thumbRef} className="w-0 h-full rounded bg-dark-purplish-blue"/>
        </div>
    )
}