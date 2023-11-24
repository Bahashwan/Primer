import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {addPaddingPage, removePaddingPage} from "@/utils";
import {inter} from "@/styles/fonts";
import {Icon} from "@/components/sprite-icons";
import Image from "next/image";
import {WalletBalance} from "@/components/wallet-balance";
import {useButtonVerificationStore} from "@/store/check-status-store";
import {usePopupBuyStore, usePopupStore} from "@/store/toggle-stores";
import {WalletConnect} from "@thirdweb-dev/wallets";
import {checkConnectMetamask} from "@/blockchain-functions/wallets/metamask";
import {allowanceUser} from "@/blockchain-functions/Transaction/Config/getAllowanceUser";
import {createBigNumber} from "@/blockchain-functions/Transaction/Config/bigNumber";
import {axiosCfg} from "@/core-axios";
import {LoadingButton} from "@/components/buttons/loading-button";
import WalletConnectApprove from "@/components/explore/buttons-buy-walletconnect/WalletConnectApprove";
import WalletConnectBuy from "@/components/explore/buttons-buy-walletconnect/WalletConnectBuy";
import {metamaskBuy} from "@/blockchain-functions/Transaction/BuyProduct";
import {ProductGet} from "@/hooks-swr/product-get";
import {clsx} from "clsx";
import {useRouter} from "next/router";
import {useProductIdStore} from "@/store/product-id-store";



type PropsType = {
    count: number
}
export function BuyButtonPopup({count}: PropsType) {
    const router = useRouter()
    const {productId, setProductId} = useProductIdStore()
    const {product, isLoading, isValidating} = ProductGet({
        id: router.query.id || productId
    })
    const buyPopup = usePopupBuyStore()

    return (
        <Transition
            show={buyPopup.isOpen}
            as={Fragment}
            beforeEnter={addPaddingPage}
            afterLeave={() => {
                removePaddingPage()
                if (productId) setProductId(null)
            }}
        >
            <Dialog as="div" className={"relative z-50 " + `${inter.variable} font-sans`} onClose={() => buyPopup.close()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out transition-[opacity] duration-150 sm:ease-smoothly-gentle sm:duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in transition-[opacity] duration-150 sm:ease-smoothly-gentle sm:duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed improve-performance inset-0 bg-black/[0.50] backdrop-blur" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto sm:overflow-hidden sm:static">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:block sm:p-0 sm:static">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out transition-[opacity,transform] duration-150 sm:ease-smoothly-gentle sm:transition-[transform] sm:duration-500"
                            enterFrom="opacity-0 scale-95 sm:scale-100 sm:opacity-100 sm:transform3d-y-full"
                            enterTo="opacity-100 scale-100 sm:transform3d-0"
                            leave="ease-in transition-[opacity,transform] duration-150 sm:ease-smoothly-gentle sm:transition-[transform] sm:duration-500"
                            leaveFrom="opacity-100 scale-100 sm:transform3d-0"
                            leaveTo="opacity-0 scale-95 sm:scale-100 sm:opacity-100 sm:transform3d-y-full"
                        >
                            <Dialog.Panel className="relative w-full max-w-[460px] overflow-hidden rounded-3xl bg-white py-10 px-4 shadow-xl sm:max-w-none sm:rounded-b-none sm:fixed sm:bottom-0 sm:right-0 sm:left-0">
                                <div onClick={() => buyPopup.close()} className="absolute cursor-pointer top-5 right-5">
                                    <Icon name="close" className="w-4 h-4"/>
                                </div>

                                <Dialog.Title
                                    as="h2"
                                    className="text-2xl font-bold text-black uppercase text-left mb-5"
                                >
                                    Checkout
                                </Dialog.Title>
                                <div className="flex items-center mb-10">
                                    <div
                                        className={clsx({
                                            "w-[100px] h-[100px] shrink-0 animate-pulse bg-[#D1D5DB] rounded-lg mr-4": isLoading,
                                            "relative w-[100px] h-[100px] shrink-0 fix-safari-bug rounded-lg overflow-hidden mr-4": !isLoading
                                        })}
                                    >
                                        {!isLoading && product?.photo_url && (
                                            <Image
                                                src={`${process.env.BASE_URL}/image/${product?.photo_url}`}
                                                alt="nft-product"
                                                width={256}
                                                height={256}
                                                className="absolute inset-0 w-full h-full object-cover object-center"
                                            />
                                        )}
                                    </div>
                                    <h3
                                        className={clsx({
                                            "w-40 h-[28px] rounded animate-pulse bg-[#D1D5DB]": isLoading,
                                            "text-left text-lg text-sapphire-blue uppercase font-bold": !isLoading,
                                            "text-left text-lg text-sapphire-blue uppercase font-bold opacity-50": !isLoading && isValidating,
                                        })}
                                    >
                                        {isLoading ? '' : `${product?.name}`}
                                    </h3>
                                </div>
                                <div className="flex flex-col mb-10">

                                    <WalletBalance/>

                                    <div className="flex items-center justify-between py-4 border-b border-solid border-[#D1D5DB]">
                                        <div className="text-base text-[#6B7280] font-bold">
                                            Total NTFs
                                        </div>

                                        <div className="text-xl text-sapphire-blue font-bold">
                                            {count}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-b border-solid border-[#D1D5DB]">
                                        <div className="text-base text-[#6B7280] font-bold">
                                            Total
                                        </div>

                                        <div className={clsx({
                                            "w-32 h-[28px] rounded animate-pulse bg-[#D1D5DB]": isLoading,
                                            "text-xl text-sapphire-blue font-bold": !isLoading,
                                            "text-xl text-sapphire-blue font-bold opacity-50": !isLoading && isValidating,
                                        })}>
                                            {isLoading ? '' : `${count * product?.price} USDT`}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-b border-solid border-[#D1D5DB]">
                                        <div className="text-base text-[#6B7280] font-bold">
                                            APR
                                        </div>

                                        <div className={clsx({
                                            "w-32 h-[28px] rounded animate-pulse bg-[#D1D5DB]": isLoading,
                                            "text-xl text-sapphire-blue font-bold": !isLoading,
                                            "text-xl text-sapphire-blue font-bold opacity-50": !isLoading && isValidating,
                                        })}>
                                            {isLoading ? '' : `${product?.profitability}%`}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-b border-solid border-[#D1D5DB]">
                                        <div className="text-base text-[#6B7280] font-bold">
                                            Profit
                                        </div>

                                        <div className={clsx({
                                            "w-32 h-[28px] rounded animate-pulse bg-[#D1D5DB]": isLoading,
                                            "text-xl text-sapphire-blue font-bold": !isLoading,
                                            "text-xl text-sapphire-blue font-bold opacity-50": !isLoading && isValidating,
                                        })}>
                                            {isLoading ? '' : `${(count * product?.price) * product?.profitability / 100} USDT`}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <ButtonVerification
                                        productId={product?.id || 0}
                                        productPrice={product?.price || 0}
                                        count={count}
                                    />

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}


type ButtonVerificationTypeProps = {
    productId: number,
    productPrice: number
    count: number
}
function ButtonVerification({productId, productPrice, count }: ButtonVerificationTypeProps) {
    const loading = useButtonVerificationStore(state => state.loading);
    const {addLoading,removeLoading} = useButtonVerificationStore();
    const buyPopup = usePopupBuyStore();
    const authPopup = usePopupStore();

    const [walletConnectBuy,setWalletConnectBuy] = useState<boolean>(false);

    const wallet = new WalletConnect({qrcode:false})
    const [walletApprove,setWalletApprove] = useState<boolean | string>("");
    const [walletconnect,setWalletConnnect] = useState("");

    const [price,setPrice] = useState("");

    useEffect(()=>{
        let metamask;
        let walletconnect;
        addLoading();
        (async()=>{
            walletconnect = await wallet.connect();
            setWalletConnnect(walletconnect);
            if(walletconnect) {
                setWalletConnectBuy(true);
                const allowance = await allowanceUser(walletconnect);
                let price = await createBigNumber(productPrice * count);
                setPrice(price);
                if(+allowance >= +price) setWalletApprove(false);
                else setWalletApprove(true);
                removeLoading();
            };
            if(metamask &&  walletconnect) {
                alert('You have 2 wallets connected');
                buyPopup.close();
                removeLoading()
                return;
            }
        })();
        (async()=>{
            metamask = await checkConnectMetamask();
            if(!metamask && !walletconnect) {
                axiosCfg.get('/api/auth/logout').catch(console.error);
                buyPopup.close();
                authPopup.open();
            };
            removeLoading();
        })();
    },[])

    return (
        <>
            {loading ? (
                <>
                    <LoadingButton
                        btnClasses="flex justify-center w-full px-3.5 py-2.5 uppercase font-semibold text-white text-lg bg-[#111827]/[.95] rounded-[40px] cursor-default"
                        svgClasses="animate-spin w-7 h-7"
                    />
                </>
            ) : (
                <>

                    {walletConnectBuy ? (
                        <>
                            {walletApprove ? (
                                <>
                                    <WalletConnectApprove
                                        price={price}
                                        walletconnect={walletconnect}
                                    />
                                </>
                            ):(
                                <>

                                    <WalletConnectBuy
                                        productId={productId-1}
                                        count={count}
                                        walletconnect={walletconnect}
                                    />
                                </>
                            )}
                        </>

                    ): (
                        <button onClick={()=>{metamaskBuy(productPrice,productId - 1 ,count)}} className="w-full px-3.5 py-2.5 uppercase font-semibold text-white text-lg bg-[#111827]/[.95] rounded-[40px]">Buy</button>
                    )}
                </>

            )}
        </>
    )
};