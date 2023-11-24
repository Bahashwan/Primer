import Image from "next/image";
import {useState} from "react";
import Head from "next/head";
import {MoreCollection} from "@/components/explore/more-collection";
import {ZoomImage} from "@/components/explore/zoom-image";
import {Counter} from "@/components/explore/counter";
import {BuyButton} from "@/components/explore/buy-button";
import {CheckAuthentication} from "@/components/check-authentication";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {SWRConfig} from "swr"
import {ProductType} from "@/components/cards";
import {useRouter} from "next/router";
import {Share} from "@/components/explore/share";
import {ProductGet} from "@/hooks-swr/product-get";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const productId = context.query.id as string
    let fallback: { [key: string]: ProductType} = {}
    if (isNaN(+productId) || productId === "0") {
        return {
            notFound: true
        }
    }

    try {
        const res = await fetch(`${process.env.BASE_URL}/api/product/${productId}`)
        const data = await res.json();
       
        if (!data) {
            return {
                notFound: true
            }
        }
        fallback[`/api/product/${productId}`] = data

        return {
            props: {
                fallback
            }
        }
    } catch (e) {
        console.error(e)
        return {
            notFound: true
        }
    }
}

export default function CurrentProductPage({fallback}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <SWRConfig value={{ fallback }}>
            <CurrentProduct/>
        </SWRConfig>
    )
}
function CurrentProduct() {
    const router = useRouter()
    const {product} = ProductGet({
        id: router.query.id
    })

    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <section className="pt-[112px]">
                <div className="max-w-container mx-auto px-8 lg:px-4">
                    <div className="grid grid-cols-2 gap-10 mb-[120px] xl:grid-cols-1">
                        <div className="bg-snow-white self-start rounded-3xl shadow-btn p-4 xl:max-w-[512px] xl:justify-self-center m:p-0 m:shadow-none">
                            <div className="relative aspect-square overflow-hidden rounded-3xl fix-safari-bug">
                                <Image
                                    src={`${process.env.BASE_URL}/image/${product.photo_url}`}
                                    alt="current-nft-product"
                                    width={800}
                                    height={800}
                                    className="w-full h-full object-cover object-center"
                                />
                                <ZoomImage photo_url={product.photo_url}/>
                            </div>
                        </div>
                        <div className="xl:flex xl:flex-col">
                            <div className="xl:mb-6">
                                <h1 className="text-5xl text-sapphire-blue font-bold uppercase mb-10 xl:max-w-[692px] lg:text-4xl lg:max-w-[490px] sm:text-2xl sm:max-w-[360px]">
                                    {product!.name}
                                </h1>

                                <div className="px-6 flex flex-wrap gap-6 pb-10 border-b border-[#D1D5DB] border-solid mb-10 md:px-0 md:flex-col md:flex-nowrap">
                                    <div className="flex grow min-w-[310px] gap-6 xl:min-w-min xl:grow-0 md:grow m:flex-col m:min-w-0">
                                        <div className="bg-[#F3F4F6] min-w-[143px] w-2/4 rounded-2xl p-4 xl:min-w-min xl:w-auto md:w-2/4 m:w-full">
                                            <div className="text-sapphire-blue uppercase font-semibold text-sm opacity-75">Price</div>
                                            <div className="text-2xl font-semibold text-sapphire-blue">{product.price} USDT</div>
                                        </div>
                                        <div className="bg-[#F3F4F6] min-w-[143px] w-2/4 rounded-2xl p-4 xl:min-w-min xl:w-auto md:w-2/4 m:w-full">
                                            <div className="text-sapphire-blue uppercase font-semibold text-sm opacity-75">Duration</div>
                                            <div className="text-2xl font-semibold text-sapphire-blue">{product.expiration} days</div>
                                        </div>
                                    </div>

                                    <div className="flex grow min-w-[310px] gap-6 xl:min-w-min xl:grow-0 md:grow m:flex-col m:min-w-0">
                                        <div className="bg-[#F3F4F6] min-w-[143px] w-2/4 rounded-2xl p-4 xl:min-w-min xl:w-auto md:w-2/4 m:w-full">
                                            <div className="text-sapphire-blue uppercase font-semibold text-sm opacity-75">APR</div>
                                            <div className="text-2xl font-semibold text-sapphire-blue">{product.profitability}%</div>
                                        </div>
                                        <div className="bg-[#F3F4F6] min-w-[143px] w-2/4 rounded-2xl p-4 xl:min-w-min xl:w-auto md:w-2/4 m:w-full">
                                            <div className="text-sapphire-blue uppercase font-semibold text-sm opacity-75">Profit</div>
                                            <div className="text-2xl font-semibold text-sapphire-blue">{(product.price * product.expiration * product.profitability / 365).toFixed(2)} USDT</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 flex justify-between mb-10 md:px-0 sm:flex-col">
                                    <ContainerBuy/>
                                    <Share/>
                                </div>
                            </div>

                            <div className="flex flex-col xl:grid xl:grid-cols-auto-fill-440 xl:gap-6 xl:items-start sm:grid-cols-1">

                                <div className="bg-white rounded-3xl shadow-btn border border-[#D1D5DB] border-solid p-6 mb-6 xl:mb-0">
                                    <div className="text-sapphire-blue mb-4">
                                        <h2 className="uppercase font-bold text-2xl">Description</h2>
                                    </div>
                                    <div>
                                        <p className="text-[18px] font-normal text-greyish-purplish-blue mb-2 m:text-sm">
                                            {product.description}
                                        </p>
                                        <button className="pb-1 border-b border-sapphire-blue border-dashed font-normal text-sapphire-blue text-[18px] m:text-sm">Show more</button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl shadow-btn border border-[#D1D5DB] border-solid p-6 mb-6 xl:mb-0">
                                    <div className="text-sapphire-blue mb-4">
                                        <h2 className="uppercase font-bold text-2xl">Details</h2>
                                    </div>
                                    <div className="pl-6 pr-32 xl:px-0">
                                        <div className="contact-address flex items-center justify-between font-normal text-[18px] text-greyish-purplish-blue mb-4 m:text-sm">
                                            <div>
                                                Contact Address
                                            </div>
                                            <a href="https://mumbai.polygonscan.com/token/0x09e76920f9482e1ac8410a3b97f89a027f493095" target="_blank">4х65...545</a>
                                        </div>

                                        <div className="contact-address flex items-center justify-between font-normal text-[18px] text-greyish-purplish-blue m:text-sm">
                                            <div>
                                                Token ID
                                            </div>
                                            <div>4564</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <MoreCollection/>
            <CheckAuthentication/>
        </>
    )
}

function ContainerBuy() {
    const [count, setCount] = useState<number>(1)

    return (
        <div className="flex sm:justify-between">
            <Counter onChange={(value) => setCount(value)}/>
            <BuyButton count={count}/>
        </div>
    )
}