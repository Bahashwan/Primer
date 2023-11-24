import NextImage from "next/image";
import Link from "next/link";
import {Image} from "@/components/image-custom";
import {format} from "date-fns";
import {usePopupBuyStore, usePopupStore} from "@/store/toggle-stores";
import {useAuthorizationStore} from "@/store/authorization-store";
import {useProductIdStore} from "@/store/product-id-store";


export type CategoryType = {
    id: number,
    name: string,
    isVisible: boolean
}

export type BlogType = {
    id: number,
    title: string,
    description: string,
    banner: string,
    date: string,
    Category: CategoryType[]
}

export type ArticleCardType = BlogType & { name?: string }

export function BlogCard({id, name, banner, title, date, description, Category}: ArticleCardType) {
    return (
        <article
            className={(name ? `${name} ` : '') + "group justify-between overflow-hidden rounded-3xl border border-solid border-[#E5E7EB] cursor-pointer fix-safari-bug"}
        >
            <Link href={`/blog/${id}`} className="flex flex-col h-full">
                <div className="relative h-[290px] -mb-10 flex justify-start grow px-4 pt-4 -z-1">
                    <div className="text-sm self-start text-white font-normal py-2 px-4 rounded-2xl border border-solid border-[#F3F4F6] bg-black/[0.45] shadow-shift backdrop-blur-[2px] z-1 uppercase">
                        Article
                    </div>
                    <NextImage
                        src={`${process.env.BASE_URL}/image/${banner}`}
                        alt="blog-image"
                        width={512}
                        height={512}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </div>
                <div className="flex flex-col justify-between p-6 bg-white rounded-t-3xl">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {Category.map(item => (
                            <div key={item.id} className="py-2 px-4 font-medium text-xs text-[#1F2937] border border-solid border-[#1F2937] rounded-2xl xl:group-[.blog-cart]:py-1">
                                {item.name}
                            </div>
                        ))}
                    </div>
                    <h3 title={title} className="mb-4 text-lg uppercase font-semibold text-dark-purplish-blue line-clamp-2 group-hover:underline xl:group-[.blog-cart]:text-base md:text-base">
                        {title}
                    </h3>
                    <div className="text-[#9CA3AF] font-semibold text-sm mb-4">{format(new Date(date), 'dd.MM.yyyy')}</div>
                    <p className="text-greyish-purplish-blue text-lg line-clamp-3 font-normal xl:group-[.blog-cart]:text-sm md:text-base">{description}</p>
                </div>
            </Link>
        </article>
    )
}

export type ProductType = {
    id: number,
    name: string,
    price: number,
    description: string,
    minimalSum: number,
    expiration: number,
    profitability: number,
    photo_url: string,
    isPopular: boolean,
    isBest: boolean,
    isTrending: boolean,
    isHidden: boolean,
    createAt: string,
    updateAt: string
}

export function ProductCard({id, name, price, expiration, profitability, photo_url}: ProductType) {
    return (
        <article className="product-card group bg-snow-white rounded-3xl hover:shadow-btn duration-200 ease-out border border-[#E5E7EB] border-solid p-2">
            <Link href={`/explore/${id}`} className="flex flex-col h-full">
                <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl fix-safari-bug h-[236px] px-2 pt-2 pb-3.5 mb-4">
                    <div className="flex justify-end">
                        <div className="px-4 py-2 border border-white border-solid rounded-2xl shadow-shift backdrop-blur-[2px] bg-signal-black text-white text-sm font-medium">
                            APR {profitability}%
                        </div>
                    </div>
                    <div className="flex justify-center">
                       <Button id={id}/>
                    </div>
                    <Image width={512} height={512} src={`${process.env.BASE_URL}/image/${photo_url}`} alt="nft-product"/>
                </div>
                <div className="flex flex-col grow justify-between">
                    <h2 className="text-lg font-semibold text-sapphire-blue line-clamp-2 mb-[18px]">{name}</h2>
                    <div className="flex justify-between bg-[#E5E7EB] p-4 rounded-2xl sm:p-2">
                        <div>
                            <h3 className="text-sapphire-blue uppercase font-semibold text-[13px] opacity-75">Price</h3>
                            <div className="text-base font-semibold text-sapphire-blue">{price} USDT</div>
                        </div>
                        <div>
                            <h3 className="text-sapphire-blue uppercase font-semibold text-[13px] opacity-75">Duration</h3>
                            <div className="text-base font-semibold text-sapphire-blue">{expiration} days</div>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    )
}

type PropsType = {
    id: number
}

function Button({id}: PropsType) {
    const {setProductId} = useProductIdStore()
    const buyPopup = usePopupBuyStore()
    const authorizationPopup = usePopupStore()
    const address = useAuthorizationStore(state => state.address);
    return (
        <button
            className="text-base text-white font-semibold py-3.5 px-9 bg-[#111827]/[.95] rounded-[40px] duration-200 ease-out opacity-0 z-1 group-hover:opacity-100"
            onClick={(e) => {
                e.preventDefault()
                if (address) {
                    setProductId(id)
                    buyPopup.open()
                }
                else authorizationPopup.open()
            }}
        >
            Buy now
        </button>
    )
}