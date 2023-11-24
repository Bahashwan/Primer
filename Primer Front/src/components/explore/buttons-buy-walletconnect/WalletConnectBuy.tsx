import { config } from "@/blockchain-functions/Transaction/Config";
import { LoadingButton } from "@/components/buttons/loading-button";
import { usePopupBuyStore } from "@/store/toggle-stores";
import {  Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";





type productWalletConnectBuyType = {
    productId : number,
    count: number,
    walletconnect:string
}

export default function WalletConnectBuy({productId,count,walletconnect}:productWalletConnectBuyType) {
    const buyPopup = usePopupBuyStore();

    const {contract} = useContract(config.contract.product.address, config.contract.product.abi);
    const {mutateAsync: buyProduct} = useContractWrite(
        contract,
        "buyProduct",
    );
    

    if(contract) return (
        <Web3Button
            className="!w-full !px-3.5 !py-2.5 !uppercase !font-semibold !text-white !text-lg !bg-[#111827]/[.95] !rounded-[40px]"
            contractAddress={config.contract.product.address}
            action={()=>buyProduct({args:[walletconnect,productId,count]})}
            theme="light"
            onSuccess={()=>{
                buyPopup.close();
                alert("Success")
            }}
            onError={()=>{
                buyPopup.close();
                alert("Error")
            }}
        >
            Buy
        </Web3Button>  
    );
    else return(
        <>
            <LoadingButton
                btnClasses="flex justify-center w-full px-3.5 py-2.5 uppercase font-semibold text-white text-lg bg-[#111827]/[.95] rounded-[40px] cursor-default"
                svgClasses="animate-spin w-7 h-7"
            />
        </>);   

    
}