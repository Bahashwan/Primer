import {Slider} from "@/components/slider";
import Link from "next/link";

export function NftBestConditions() {

    return (
        <section className="nft-best-conditions py-20 px-10 lg:px-0" draggable="false">
            <div className="grid grid-cols-[560px_1fr] gap-10 rounded-3xl bg-section-gradient pt-20 pb-[95px] pl-calculation 2xl:grid-cols-[minmax(420px,_1fr)_2fr] lg:grid-cols-1 lg:gap-4 sm:pl-calculation-mob m:bg-section-gradient-mobile">
                <div className="relative flex justify-center flex-col select-none 2xl:max-w-[560px]">
                    <h2 className="text-5xl text-dark-purplish-blue uppercase font-bold mb-6 sm:text-[32px] sm:pr-4">NFTs with best conditions</h2>
                    <p className="text-lg font-normal text-greyish-purplish-blue mb-20 lg:mb-10 sm:pr-4">
                        Link your cryptocurrency wallet to the website. The wallet must support the cryptocurrency used by the website, such as Ethereum or Bitcoin.
                    </p>
                    <Link href="/explore" className="w-[240px] text-center text-lg bg-white text-dark-purplish-blue font-semibold rounded-3xl py-3.5 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 lg:mb-[30px]">
                        Discover more
                    </Link>
                </div>
               <Slider/>
            </div>
        </section>
    )
}