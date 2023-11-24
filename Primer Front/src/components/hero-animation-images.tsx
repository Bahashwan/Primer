import Image from "next/image";
import {MouseParallax} from "react-just-parallax";
import {motion} from 'framer-motion';
import {useEffect, useState} from "react";

type AnimationImage = {
    id: number,
    url: string,
    class: string,
    media: string | null
    strength: number,
    lerpEase: number
}

const ease = [0.23, 1, 0.32, 1];
const images: AnimationImage[] = [
    {
        id: 1,
        url: "/images/nft1.jpg",
        class: "hero-image-presentation-1",
        media: null,
        strength: 0.0400,
        lerpEase: 0.1600
    },
    {
        id: 2,
        url: "/images/nft2.jpg",
        class: "hero-image-presentation-2",
        media: null,
        strength: 0.0420,
        lerpEase: 0.1540
    },
    {
        id: 3,
        url: "/images/nft3.jpg",
        class: "hero-image-presentation-3",
        media: null,
        strength: 0.0440,
        lerpEase: 0.1480
    },
    {
        id: 4,
        url: "/images/nft4.jpg",
        class: "hero-image-presentation-4",
        media: null,
        strength: 0.0460,
        lerpEase: 0.1420
    },
    {
        id: 5,
        url: "/images/nft5.jpg",
        class: "hero-image-presentation-5",
        media: null,
        strength: 0.0480,
        lerpEase: 0.1360
    },
    {
        id: 6,
        url: "/images/nft1.jpg",
        class: "hero-image-presentation-6",
        media: null,
        strength: 0.0500,
        lerpEase: 0.1300
    },
    {
        id: 7,
        url: "/images/nft2.jpg",
        class: "hero-image-presentation-7",
        media: null,
        strength: 0.0520,
        lerpEase: 0.1240
    },
    {
        id: 8,
        url: "/images/nft3.jpg",
        class: "hero-image-presentation-8",
        media: null,
        strength: 0.0540,
        lerpEase: 0.1180
    },
    {
        id: 9,
        url: "/images/nft4.jpg",
        class: "hero-image-presentation-9",
        media: null,
        strength: 0.0560,
        lerpEase: 0.1120
    },
    {
        id: 10,
        url: "/images/nft5.jpg",
        class: "hero-image-presentation-10",
        media: null,
        strength: 0.0580,
        lerpEase: 0.1060
    },
    {
        id: 11,
        url: "/images/nft1.jpg",
        class: "hero-image-presentation-11",
        media: "(max-width:639px)",
        strength: 0.0600,
        lerpEase: 0.1000
    },
    {
        id: 12,
        url: "/images/nft2.jpg",
        class: "hero-image-presentation-12",
        media: "(max-width:639px)",
        strength: 0.0620,
        lerpEase: 0.0940
    },
    {
        id: 13,
        url: "/images/nft3.jpg",
        class: "hero-image-presentation-13",
        media: "(max-width:639px)",
        strength: 0.0640,
        lerpEase: 0.0880
    },
    {
        id: 14,
        url: "/images/nft4.jpg",
        class: "hero-image-presentation-14",
        media: "(max-width:639px)",
        strength: 0.0660,
        lerpEase: 0.0820
    },
    {
        id: 15,
        url: "/images/nft5.jpg",
        class: "hero-image-presentation-15",
        media: "(max-width:639px)",
        strength: 0.0680,
        lerpEase: 0.0760
    },
    {
        id: 16,
        url: "/images/nft1.jpg",
        class: "hero-image-presentation-16",
        media: "(max-width:639px)",
        strength: 0.0700,
        lerpEase: 0.0700
    },
    {
        id: 17,
        url: "/images/nft2.jpg",
        class: "hero-image-presentation-17",
        media: "(max-width:639px)",
        strength: 0.0720,
        lerpEase: 0.0640
    },
    {
        id: 18,
        url: "/images/nft3.jpg",
        class: "hero-image-presentation-18",
        media: "(max-width:639px)",
        strength: 0.0740,
        lerpEase: 0.0580
    },
    {
        id: 19,
        url: "/images/nft4.jpg",
        class: "hero-image-presentation-19",
        media: "(max-width:639px)",
        strength: 0.0760,
        lerpEase: 0.0520
    },
    {
        id: 20,
        url: "/images/nft5.jpg",
        class: "hero-image-presentation-20",
        media: "(max-width:639px)",
        strength: 0.0780,
        lerpEase: 0.0460
    },
    {
        id: 21,
        url: "/images/nft1.jpg",
        class: "hero-image-presentation-21",
        media: "(max-width:639px)",
        strength: 0.0800,
        lerpEase: 0.0400
    },
    {
        id: 22,
        url: "/images/nft2.jpg",
        class: "hero-image-presentation-22",
        media: "(max-width:639px)",
        strength: 0.0820,
        lerpEase: 0.0340
    }
]


export function HeroAnimationImages() {
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
        setTimeout(() => setReveal(true), 420);
    }, []);


    return (
        <div className="absolute w-full h-full inset-0 max-w-[1800px] mx-auto">
            {images.map((image, i) => (
                <div key={image.id} className={image.class}>
                    <MouseParallax lerpEase={image.lerpEase} shouldPause={false} strength={image.strength}>
                        <motion.div
                            className="w-full h-full"
                            animate={reveal ? { opacity: 1, scale: 1 } : {opacity: 0, scale: 0}}
                            initial={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.6, ease, delay: i / 20 }}
                        >
                            {image.media ? (
                                <picture>
                                    <source srcSet="/images/1x1.png" media={image.media} type="image/png"/>
                                    <Image
                                        src={image.url}
                                        alt=""
                                        role="presentation"
                                        width={512}
                                        height={512}
                                        className="w-full h-full object-cover object-center rounded-[10%] select-none"
                                        draggable={false}
                                    />
                                </picture>
                            ) : (
                                <Image
                                    src={image.url}
                                    alt=""
                                    role="presentation"
                                    width={512}
                                    height={512}
                                    className="w-full h-full object-cover object-center rounded-[10%] select-none"
                                    draggable={false}
                                />
                            )}
                        </motion.div>
                    </MouseParallax>
                </div>
            ))}
        </div>
    )
}