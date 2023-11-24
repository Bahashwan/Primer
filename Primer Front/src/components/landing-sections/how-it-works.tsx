type ListHTW = {
    id: string,
    title: string,
    description: string
}

const list: ListHTW[] = [
    {
        id: "01",
        title: "Connect your wallet",
        description: "Link your cryptocurrency wallet to the website. The wallet must support the cryptocurrency used by the website, such as Ethereum or Bitcoin."
    },
    {
        id: "02",
        title: "Buy some nft",
        description: "Link your cryptocurrency wallet to the website. The wallet must support the cryptocurrency used by the website, such as Ethereum or Bitcoin."
    },
    {
        id: "03",
        title: "Link your wallet",
        description: "Link your cryptocurrency wallet to the website. The wallet must support the cryptocurrency used by the website, such as Ethereum or Bitcoin."
    },
    {
        id: "04",
        title: "Earn up to 60% APR",
        description: "Link your cryptocurrency wallet to the website. The wallet must support the cryptocurrency used by the website, such as Ethereum or Bitcoin."
    }
]

export function HowItWorks() {
    return (
        <section className="how-it-works bg-snow-white pt-32 pb-[138px] sm:pt-20 sm:pb-32">
            <div className="max-w-container mx-auto px-8 lg:px-4 sm:px-0">
                <div className="flex items-center justify-between mb-[61px] sm:px-4 sm:flex-col sm:items-start">
                    <h2 className="text-5xl text-dark-purplish-blue uppercase font-bold xl:text-4xl sm:text-[32px] sm:mb-6 m:text-2xl">
                        How it works
                    </h2>
                    <button
                        className="w-[240px] text-lg bg-white text-dark-purplish-blue font-semibold rounded-3xl py-3.5 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 m:text-base">
                        Learn more
                    </button>
                </div>
                <div className="grid grid-cols-2 auto-rows-[300px] gap-10 sm:flex sm:flex-nowrap sm:overflow-x-auto sm:pl-4 sm:pb-4">
                    {list.map(item => (
                        <div key={item.id} className="relative sm:min-w-[360px] m:min-w-[300px] last:mr-4">
                            <div className="font-bold text-[200px] leading-[120%] text-[#EDE9FE] opacity-50 -mb-[75px] lg:text-[180px]">{item.id}</div>
                            <div className="relative z-10 bg-snow-white">
                                <h3 className="text-[32px] leading-[120%] mb-6 text-dark-purplish-blue uppercase font-bold lg:text-2xl">{item.title}</h3>
                                <p className="text-lg leading-[150%] text-greyish-purplish-blue font-normal">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}