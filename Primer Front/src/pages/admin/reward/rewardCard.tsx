import { ProductType } from "@/components/cards"
import {metamaskReward} from "@/blockchain-functions/Transaction/Reward";
import WalletConnect from "@walletconnect/client";
import { createRewardData } from "@/blockchain-functions/Transaction/Config/createDataTransaction";
import { createCustomRequest } from "@/blockchain-functions/Transaction/Config/sendTransaction";
import { config } from "@/blockchain-functions/Transaction/Config";
import { validateStatus } from "@/blockchain-functions/Transaction/Config/ValidateTransaction";

interface user {
    address: string;
    id:number;
}

interface product {
    name:string;
    id:number;

}

interface transaction {
    Product:product;
    User:user;
    action: string;
    date:string;
    id:number;
    productCount: number;
    productId: number;
    status:boolean;
    transactionHash: string;
    userId:number;
}

interface rewardCard {
    Transaction:transaction,
    expiration_days: number,
    expiration_end: string,
    expiration_start: string,
    id:number,
    isActive: string,
    status:string,
    transactionId:number
}

export default function RewardCard({card,walletconnect}:{card:rewardCard,walletconnect:boolean | null}) {
    const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
    });
    async function rewardProduct() {
        try {
            const address = connector.accounts[0];
            const data = await createRewardData(card.Transaction.Product.id,card.Transaction.User.address,card.Transaction.productCount);
            if(data) {
                const customRequest = await createCustomRequest(
                    address,
                    config.contract.reward.address,
                    data,
                    "0x0"
                );
                await connector.sendCustomRequest(customRequest)
                 .then(async (res:any)=>{
                    let statusResult = await validateStatus(res);
                    if(statusResult.txStatus) {
                        alert("Success");
                    }
                    else alert('error');
                 })
                 .catch(console.error);
            }   
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <div
            className="flex w-[600px] shadow p-7 rounded-full items-center border border-black justify-between"
        >
            <div>
                <p className="text-xs">Public
                    Address: {card?.Transaction.User.address.slice(0, 6) + "..." + card?.Transaction.User.address.slice(-6)}
                </p>
                <p className="text-xs">product name: {card?.Transaction.Product.name}</p>
                <p className="text-xs">product id: {card?.Transaction.Product.id}</p>
                <p className="text-xs">count: {card?.Transaction.productCount}</p>
                <p className="text-xs">transactionHash: {card?.Transaction.transactionHash.slice(0, 6) + "..." + card?.Transaction.transactionHash.slice(-9)}</p>
            </div>
            {walletconnect ? 
             <button onClick={rewardProduct}>Reward</button>
             :
             <button
                className="px-6 py-3 rounded-3xl bg-lime-500 text-white"
                onClick={() => {
                    metamaskReward(card?.Transaction.User.address, card.id - 1, card?.Transaction.productCount)
                }}
            >
                Reward
            </button>}
           
            
        </div>
    )
}