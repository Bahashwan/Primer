import {useEffect, useRef, useState, Fragment} from "react";
import {AnimationPlaybackControls, useAnimate} from "framer-motion";

enum status {
    IS_MOBILE = "IsMobile",
    NOT_MOBILE = "NotMobile"
}

const easeInExpo = [0.95, 0.05, 0.795, 0.035]
const easeOutExpo = [0.19, 1, 0.22, 1]

const sequenceFirst = [
    [
        ".letter",
        { opacity: 0, x: [0, -30] },
        { duration: 1.1, delay: (i: number) => 1 + i * 0.03, ease: easeInExpo }
    ],
]

const sequence = [
    [
        ".letter",
        { opacity: 1, x: [40, 0] },
        { duration: 1.2, delay: (i: number) => 0.5 + i * 0.03, ease: easeOutExpo }
    ],
    [
        ".letter",
        { opacity: 0, x: [0, -30] },
        { duration: 1.1, delay: (i: number) => 0.5 + i * 0.03, ease: easeInExpo }
    ],
]

const sequenceMobFirst = [
    [
        ".text",
        { opacity: 0, y: [0, -20] },
        { duration: 0.4, delay: 2, ease: "easeInOut" }
    ],
]

const sequenceMob = [
    [
        ".text",
        { opacity: 1, y: [20, 0] },
        { duration: 0.4, delay: 0.4, ease: "easeInOut" }
    ],
    [
        ".text",
        { opacity: 0, y: [0, -20] },
        { duration: 0.4, delay: 3, ease: "easeInOut" }
    ],
];


const text: string[] = ["Get 10$ rer 5 days", "Get 20$ rer 6 days", "Get 30$ rer 7 days"]
const textHTML: string[] = [`Get 10$ rer <span>5 days</span>`, `Get 20$ rer <span>6 days</span>`, `Get 30$ rer <span>7 days</span>`]

export function AnimationTitle() {
    const [initialization, setInitialization] = useState<status.IS_MOBILE | status.NOT_MOBILE | null>(null)
    const [first, setFirst] = useState<boolean>(true)
    const [index, setIndex] = useState<number>(0)
    const linkAnimate = useRef<AnimationPlaybackControls | null>(null)
    const [scope, animate] = useAnimate()

    useEffect(() => {
        const media = window.matchMedia('(max-width: 639px)')
        if (media.matches) setInitialization(status.IS_MOBILE)
        else setInitialization(status.NOT_MOBILE)
        function mediaChanged(e: MediaQueryListEvent) {
            linkAnimate.current?.stop()
            setFirst(true)
            if (e.matches) {
                setInitialization(status.IS_MOBILE)
            } else {
                setInitialization(status.NOT_MOBILE)
            }
        }
        media.addEventListener('change', mediaChanged)
        return () => media.removeEventListener('change', mediaChanged)
    }, [])


    useEffect(() => {
        if (initialization) {
            //@ts-ignore - очень странная ошибка с типизацией у framer motion, в интернете решение проблемы не нашел
            if (initialization === status.NOT_MOBILE) linkAnimate.current = animate(first ? sequenceFirst : sequence)
            //@ts-ignore - очень странная ошибка с типизацией у framer motion, в интернете решение проблемы не нашел
            else linkAnimate.current = animate(first ? sequenceMobFirst : sequenceMob)
            linkAnimate.current?.then(() => {
                if (first) setFirst(false)
                if (index < text.length - 1) setIndex(index + 1)
                else setIndex(0)
            })
        }

    }, [index, initialization])

    return (
        <>
            {!initialization && (
                <h1 className="title text-[100px] font-bold mb-[21px] text-dark-purplish-blue uppercase xl:text-[72px] lg:text-[60px] md:text-[48px] sm:flex sm:items-center sm:flex-col m:text-4xl"
                    dangerouslySetInnerHTML={{__html: textHTML[0] }}
                />
            )}
            {initialization === status.NOT_MOBILE && (
                <h1 className="title text-[100px] font-bold mb-[21px] text-dark-purplish-blue uppercase xl:text-[72px] lg:text-[60px] md:text-[48px] sm:flex sm:items-center sm:flex-col m:text-4xl"
                    ref={scope}
                >
                    {text[index].split(" ").map((word, i) => (
                        <Fragment key={i}>
                            {word.split("").map((character, j) => (
                                <span key={j} className="letter inline-block will-change-transform">{character}</span>
                            ))}
                            {i !== text[index].split(" ").length - 1 && <>&nbsp;</>}
                        </Fragment>
                    ))}
                </h1>
            )}
            {initialization === status.IS_MOBILE && (
                <h1 className="title font-bold mb-[21px] text-dark-purplish-blue uppercase text-[48px] m:text-4xl"
                    ref={scope}
                >
                    <div className="text sm:flex sm:items-center sm:flex-col" dangerouslySetInnerHTML={{__html: textHTML[index] }}/>
                </h1>
            )}
        </>
    )
}