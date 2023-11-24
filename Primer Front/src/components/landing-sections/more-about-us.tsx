export function MoreAboutUs() {
    return (
        <section className="more-about-us py-32 bg-snow-white">
            <div className="max-w-container mx-auto px-8 lg:px-4">
                <h2 className="text-5xl text-dark-purplish-blue uppercase font-bold mb-16 xl:text-4xl sm:text-[32px] m:text-2xl">
                    More about us
                </h2>
                <div className="grid grid-cols-4 gap-10 xl:grid-cols-6 sm:grid-cols-1">
                    <div className="px-8 pt-8 pb-10 rounded-3xl snow-white transition duration-300 ease-in-out hover:shadow-btn cursor-pointer xl:col-span-2 lg:col-span-3 lg:shadow-btn sm:col-span-1 sm:row-span-1">
                        <h3 className="text-5xl uppercase font-bold text-dark-purplish-blue whitespace-nowrap m:text-2xl">10 <span className="text-2xl m:text-lg">usdt</span></h3>
                        <p className="font-normal text-lg text-[#1F2937] m:text-base">Minimum NFT price</p>
                    </div>
                    <div className="px-8 pt-8 pb-10 rounded-3xl snow-white transition duration-300 ease-in-out hover:shadow-btn cursor-pointer xl:col-span-2 lg:col-span-3 lg:shadow-btn sm:col-span-1 sm:row-span-1">
                        <h3 className="text-5xl uppercase font-bold text-dark-purplish-blue whitespace-nowrap m:text-2xl">60% <span className="text-2xl m:text-lg">APR</span></h3>
                        <p className="font-normal text-lg text-[#1F2937] m:text-base">Estimated yield</p>
                    </div>
                    <div className="px-8 pt-8 pb-10 rounded-3xl snow-white transition duration-300 ease-in-out hover:shadow-btn cursor-pointer xl:col-span-2 xl:row-start-2 xl:row-end-3 lg:col-span-3 lg:shadow-btn sm:col-span-1 sm:row-span-1">
                        <h3 className="text-5xl uppercase font-bold text-dark-purplish-blue whitespace-nowrap m:text-2xl">30 <span className="text-2xl m:text-lg">days</span></h3>
                        <p className="font-normal text-lg text-[#1F2937] m:text-base">Minimum lock-up period</p>
                    </div>
                    <div className="px-8 pt-8 pb-10 rounded-3xl snow-white transition duration-300 ease-in-out hover:shadow-btn cursor-pointer xl:col-span-2 xl:row-start-2 xl:row-end-3 lg:col-span-3 lg:shadow-btn sm:col-span-1 sm:row-span-1">
                        <h3 className="text-5xl uppercase font-bold text-dark-purplish-blue whitespace-nowrap m:text-2xl">10</h3>
                        <p className="font-normal text-lg text-[#1F2937] m:text-base">Offers with different conditions</p>
                    </div>
                </div>
            </div>
        </section>
    )
}