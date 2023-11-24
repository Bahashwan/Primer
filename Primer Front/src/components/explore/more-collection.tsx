import {ProductCard} from "@/components/cards";

const array = [
    {
        id: 10,
        name: "test name",
        price: 200,
        description: "test",
        minimalSum: 200,
        expiration: 30,
        profitability: 50,
        photo_url: "/images/nft1.jpeg",
        isPopular: false,
        isHidden: false,
        isBest: false,
        isTrending: false,
        createAt: "",
        updateAt: ""
    },
    {
        id: 11,
        name: "test name",
        price: 200,
        description: "test",
        minimalSum: 200,
        expiration: 30,
        profitability: 50,
        photo_url: "/images/nft1.jpeg",
        isPopular: false,
        isHidden: false,
        isBest: false,
        isTrending: false,
        createAt: "",
        updateAt: ""
    },
    {
        id: 12,
        name: "test name",
        price: 200,
        description: "test",
        minimalSum: 200,
        expiration: 30,
        profitability: 50,
        photo_url: "/images/nft1.jpeg",
        isPopular: false,
        isHidden: false,
        isBest: false,
        isTrending: false,
        createAt: "",
        updateAt: ""
    },
    {
        id: 13,
        name: "test name",
        price: 200,
        description: "test",
        minimalSum: 200,
        expiration: 30,
        profitability: 50,
        photo_url: "/images/nft1.jpeg",
        isPopular: false,
        isHidden: false,
        isBest: false,
        isTrending: false,
        createAt: "",
        updateAt: ""
    },
    {
        id: 14,
        name: "test name",
        price: 200,
        description: "test",
        minimalSum: 200,
        expiration: 30,
        profitability: 50,
        photo_url: "/images/nft1.jpg",
        isPopular: false,
        isHidden: false,
        isBest: false,
        isTrending: false,
        createAt: "",
        updateAt: ""
    },
]
export function MoreCollection() {
    return (
        <section className="more-collection mb-20">
            <div className="max-w-container mx-auto px-8 lg:px-4 md:px-0">
                <div className="flex items-center justify-between mb-10 md:px-4 sm:flex-col sm:items-start">
                    <h2 className="text-2xl text-dark-purplish-blue uppercase font-bold sm:mb-6">
                        More from this collection
                    </h2>
                    <button
                        className="w-[240px] text-lg bg-white text-dark-purplish-blue font-semibold rounded-3xl py-3.5 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 m:text-base">
                        Browse all
                    </button>
                </div>
                <div className="grid grid-cols-auto-fill-product gap-10 md:flex md:flex-nowrap md:overflow-x-auto md:gap-6 md:pl-4 md:pb-4">
                    {array.map(item => (
                        <ProductCard {...item} key={item.id}/>
                    ))}
                </div>
            </div>
        </section>
    )
}