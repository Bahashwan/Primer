import { ProductType } from "@/components/cards";
import { axiosCfg } from "@/core-axios";
import { useEffect, useState } from "react";
import RewardCard from "./rewardCard";
import { WalletConnectV1 } from "@thirdweb-dev/wallets";


export default function Reward() {
    const [rewardProducts, setRewardProducts] = useState<ProductType[] | []>([]);

    const getPaymentProduct = async () => {
        const data = await axiosCfg.get('/api/product/payment').catch(console.log);
        if (data?.data?.data) setRewardProducts(data.data.data);
    }
    const [walletconnect,setWalletConnect] = useState<boolean | null>(null);

    const wallet = new WalletConnectV1({qrcode:false});
    useEffect(() => {
        getPaymentProduct();
        (async()=>{
            const walletconnect = await wallet.connect();
            if(walletconnect) setWalletConnect(true);
        })();
    }, [])


    return (
        <>
        <h1 className="text-black mt-[80px]">Reward product users</h1>
        {rewardProducts.map((card: any) => (
            <RewardCard
                key={card.id}
                card={card}
                walletconnect={walletconnect}
            />
        ))}
        </>
    )
}