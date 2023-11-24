import { config } from "@/blockchain-functions/Transaction/Config";
import { LoadingButton } from "@/components/buttons/loading-button";
import { usePopupBuyStore } from "@/store/toggle-stores";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import WalletConnect from "@walletconnect/client";
import { useButtonVerificationStore } from "@/store/check-status-store";


type productWalletConnectApproveType = {
    price:string,
    walletconnect:string
}

export default function WalletConnectApprove({price,walletconnect}:productWalletConnectApproveType) {
    const buyPopup = usePopupBuyStore();
    const {removeLoading,addLoading} = useButtonVerificationStore();


    

    const { contract } = useContract(config.contract.token.address, config.contract.token.abi);
    const { mutateAsync, isLoading } = useContractWrite(contract, "approve"); 

    return (
        <>     
           <Web3Button
                className="!w-full !px-3.5 !py-2.5 !uppercase !font-semibold !text-white !text-lg !bg-[#111827]/[.95] !rounded-[40px]"
                contractAddress={config.contract.token.address}
                action={()=>mutateAsync({args:[config.contract.product.address, price]  })}
                theme="light"
                onSuccess={()=>alert("success")}
            >
                Approve
            </Web3Button>
        </>
            
    );
}

   


{/* <h1>fff</h1> */}

// import { createApproveData } from "@/blockchain-functions/Transaction/Config/createDataTransaction";
// import { createCustomRequest } from "@/blockchain-functions/Transaction/Config/sendTransaction";
// import { validateStatus } from "@/blockchain-functions/Transaction/Config/ValidateTransaction";
// const connector = new WalletConnectLegacyConnector({
    //     chains: [polygonMumbai],
    //     options: {
    //       qrcode: false,
    //       rpc : {
    //         80001: "https://polygon-mumbai.g.alchemy.com/v2/NxbuObqX8mOzO231HX8d0vCc0T8ttZXy"
    //       }
    //     },
    // })
    // console.log(connector)
    // const PrepareContract = usePrepareContractWrite({
    //     address: "0xC413688017aD85E81137Be85aBA09683dC4dA172",
    //     abi: config.contract.token.abi,
    //     functionName: 'approve',
    // })
    //   const { write } = useContractWrite(PrepareContract.config)
    // console.log(PrepareContract)
    // console.log(write)


    // const connector = new WalletConnect({
    //     bridge: "https://bridge.walletconnect.org",
    // });

    // console.log(connector);

    // async function sendApprove() {
    //     addLoading();
    //     try {
    //         const dataApprove = await createApproveData(price);
    //         const customRequest = await createCustomRequest(
    //             walletconnect,
    //             config.contract.token.address,
    //             dataApprove,
    //             "0x0"
    //         );
    //         await connector.sendCustomRequest(customRequest)
    //             .then(async (res:any)=>{
    //                 console.log(res);
    //                 let statusResult = await validateStatus(res);
    //                 if(statusResult.txStatus) alert("Success");
    //                 buyPopup.close();
    //                 removeLoading();
    //             })
    //             .catch(console.error);
    //     } catch (error) {
            
    //     }
        
    // }