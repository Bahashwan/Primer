import {ProductCard,ProductType} from "@/components/cards";

const list: ProductType[] = [
    {
        id: 1,
        name: "Awesome Plastic Pizza",
        price: 564,
        description: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        minimalSum: 0,
        expiration: 90,
        profitability: 48,
        photo_url: "dev.jpg",
        isPopular: false,
        isBest: false,
        isTrending: false,
        isHidden: false,
        createAt: "2023-06-08T18:30:31.099Z",
        updateAt: "2023-06-08T18:30:31.099Z"
    },
    {
        id: 1,
        name: "Awesome Plastic Pizza",
        price: 564,
        description: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        minimalSum: 0,
        expiration: 90,
        profitability: 48,
        photo_url: "dev.jpg",
        isPopular: false,
        isBest: false,
        isTrending: false,
        isHidden: false,
        createAt: "2023-06-08T18:30:31.099Z",
        updateAt: "2023-06-08T18:30:31.099Z"
    },
    {
        id: 1,
        name: "Awesome Plastic Pizza",
        price: 564,
        description: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        minimalSum: 0,
        expiration: 90,
        profitability: 48,
        photo_url: "dev.jpg",
        isPopular: false,
        isBest: false,
        isTrending: false,
        isHidden: false,
        createAt: "2023-06-08T18:30:31.099Z",
        updateAt: "2023-06-08T18:30:31.099Z"
    },
    {
        id: 1,
        name: "Awesome Plastic Pizza",
        price: 564,
        description: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        minimalSum: 0,
        expiration: 90,
        profitability: 48,
        photo_url: "dev.jpg",
        isPopular: false,
        isBest: false,
        isTrending: false,
        isHidden: false,
        createAt: "2023-06-08T18:30:31.099Z",
        updateAt: "2023-06-08T18:30:31.099Z"
    },
    {
        id: 1,
        name: "Awesome Plastic Pizza",
        price: 564,
        description: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        minimalSum: 0,
        expiration: 90,
        profitability: 48,
        photo_url: "dev.jpg",
        isPopular: false,
        isBest: false,
        isTrending: false,
        isHidden: false,
        createAt: "2023-06-08T18:30:31.099Z",
        updateAt: "2023-06-08T18:30:31.099Z"
    }
]

export function TrendindProduct() {
    return (
        <section className="trendind-product mb-20">
            <div className="max-w-container mx-auto px-8 lg:px-4 md:px-0">
                <div className="flex items-center justify-between mb-16 md:px-4 sm:flex-col sm:items-start">
                    <h2 className="text-5xl text-dark-purplish-blue uppercase font-bold xl:text-4xl md:text-[32px] sm:mb-6 m:text-2xl">
                        Trendind product
                    </h2>
                    <button
                        className="w-[240px] text-lg bg-white text-dark-purplish-blue font-semibold rounded-3xl py-3.5 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 m:text-base">
                        Browse all
                    </button>
                </div>
                <div className="grid grid-cols-auto-fill gap-10 md:flex md:flex-nowrap md:overflow-x-auto md:gap-6 md:pb-4 md:pl-4">
                    {list.map((item, i) => (
                        <ProductCard key={i} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}