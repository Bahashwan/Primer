import NextImage from "next/image";
import {useKeenSlider} from "keen-slider/react";
import {useState} from "react";
import {clsx} from "clsx";
import {Icon} from "@/components/sprite-icons";

const array = [
    {
        id: 1,
        url: "/images/img3.jpg"
    },
    {
        id: 2,
        url: "/images/nft2.jpg"
    },
    {
        id: 3,
        url: "/images/nft3.jpg"
    },
    {
        id: 4,
        url: "/images/nft4.jpg"
    }
]

export function SliderBlog() {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        slides: {
            origin: "center",
            perView: 1.6,
            spacing: 40,
        },
        breakpoints: {
            "(max-width: 1023px)": {
                slides: {
                    origin: "center",
                    perView: 1.2,
                    spacing: 40,
                },
            },
            "(max-width: 767px)": {
                slides: {
                    perView: 1,
                    spacing: 40,
                },
            },
        },
        created() {
            setLoaded(true)
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
    })

    return (
       <>

           {/* Arrows */}
           {loaded && instanceRef.current && (
               <>
                   <div
                       className="absolute z-10 -translate-y-2/4 top-[44%] left-[18%] w-10 h-10 flex items-center justify-center bg-white rounded cursor-pointer border border-solid border-[#D1D5DB] lg:left-[5%] md:left-[1%]"
                       onClick={() => instanceRef.current?.prev()}
                   >
                       <Icon name="thin-arrow" className="text-dark-purplish-blue w-[12px] h-[22px]"/>
                   </div>

                   <div
                       className="absolute z-10 -translate-y-2/4 top-[44%] right-[18%] rotate-180 w-10 h-10 flex items-center justify-center bg-white rounded cursor-pointer border border-solid border-[#D1D5DB] lg:right-[5%] md:right-[1%]"
                       onClick={() => instanceRef.current?.next()}
                   >
                       <Icon name="thin-arrow" className="text-dark-purplish-blue w-[12px] h-[22px]"/>
                   </div>
               </>
           )}
           {/* Arrows */}

           {/* Slider */}
           <div ref={sliderRef} className="keen-slider w-full">
               {array.map(slide => (
                   <div key={slide.id} className={clsx("keen-slider__slide flex items-center border border-solid border-[#D1D5DB] bg-snow-white rounded-3xl p-4 sm:flex-col", {
                       "opacity-50 md:opacity-100": slide.id - 1 !== currentSlide
                   })}>
                       <div className="w-[400px] shrink-0 aspect-square overflow-hidden rounded-3xl fix-safari-bug mr-4 xl:w-[300px] md:w-[250px] sm:mb-4 sm:mr-0 m:w-full">
                           <NextImage
                               src={slide.url}
                               alt="nft-slider-image"
                               width={700}
                               height={700}
                               className="w-full h-full object-cover object-center"
                           />
                       </div>
                       <div className="flex flex-col">
                           <div className="flex flex-wrap gap-2 mb-4">
                               <div className="py-2 px-4 font-medium text-xs text-[#1F2937] border border-solid border-[#1F2937] rounded-2xl xl:py-1">
                                   Profit
                               </div>
                               <div className="py-2 px-4 font-medium text-xs text-[#1F2937] border border-solid border-[#1F2937] rounded-2xl xl:py-1">
                                   News
                               </div>
                               <div className="py-2 px-4 font-medium text-xs text-[#1F2937] border border-solid border-[#1F2937] rounded-2xl xl:py-1">
                                   Articles
                               </div>
                           </div>
                           <h2 className="text-4xl uppercase font-bold text-dark-purplish-blue max-w-[600px] mb-4 xl:text-2xl xl:max-w-[400px] md:text-xl">
                               Fear of the Infinite Creativity Monster
                           </h2>
                           <div className="text-[#9CA3AF] font-semibold mb-4 xl:text-sm md:text-xs">25.01.2022</div>
                           <p className="text-greyish-purplish-blue text-lg line-clamp-3 font-normal max-w-[600px] xl:text-base md:text-sm">
                               If the website offers a buy-back program, you can opt-in to have the website automatically buy back your NFT at a later date for
                           </p>
                       </div>
                   </div>
               ))}
           </div>
           {/* Slider */}

           {/* Dots */}
           {loaded && instanceRef.current && (
               <div className="flex justify-center space-x-2 mt-8">
                   {instanceRef.current.slides.map((_, i) => (
                       <div
                           key={i}
                           className={"w-[35px] h-2 rounded cursor-pointer" + (currentSlide === i ? " bg-sapphire-blue" : " bg-[#D1D5DB]")}
                           onClick={() => {
                               instanceRef.current?.moveToIdx(i)
                           }}
                       />
                   ))}
               </div>
           )}
           {/* Dots */}
       </>
    )
}