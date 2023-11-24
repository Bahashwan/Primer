// 'use client'
// import { config } from "@/blockchain-functions/Transaction/Config";
// import { LoadingButton } from "@/components/buttons/loading-button";
// import { usePopupBuyStore } from "@/store/toggle-stores";
// import { Web3Button, useContract, useContractWrite, useSDK} from "@thirdweb-dev/react";


// type web3Button = {
//     contractAddress: string,
//     text:string,
//     argument:any,
//     buy: boolean
// }


// function createContractApprove(contractAddress:string) {
//     const { contract } = useContract(contractAddress,config.contract.token.abi);
//     const { mutateAsync: approve, isLoading } = useContractWrite(contract, "approve")

//     return {approve,contract};
// }

// export default function Web3SendButton({contractAddress,text,argument,buy}:web3Button) {
//     const buyPopup = usePopupBuyStore();

    
//     if(buy) {
//         const sdk = useSDK();
//         const {contract} = useContract(contractAddress, config.contract.product.abi);

//         const {mutateAsync} = useContractWrite(
//             contract,
//             "buyProduct"
//         );
//         if(contract) return (
//             <Web3Button
//                 className="!w-full !px-3.5 !py-2.5 !uppercase !font-semibold !text-white !text-lg !bg-[#111827]/[.95] !rounded-[40px]"
//                 contractAddress={contractAddress}
//                 action={()=>mutateAsync({args:argument})}
//                 theme="light"
//                 onError={(error) => {
//                     buyPopup.close();
//                     alert('Error')
//                 }}
//                 onSuccess={(result) => {
//                     console.log(result)
//                     buyPopup.close();
//                     alert("Success!")
//                 }}
                
//             >
//                 {text}
//             </Web3Button>
//         )
//         else return(
//             <>
//                 <LoadingButton
//                     btnClasses="flex justify-center w-full px-3.5 py-2.5 uppercase font-semibold text-white text-lg bg-[#111827]/[.95] rounded-[40px] cursor-default"
//                     svgClasses="animate-spin w-7 h-7"
//                 />
//             </>); 
//     }
//     else {
//         const {approve,contract} = createContractApprove(contractAddress);
//         console.log(contract );

//         const call = async () => {
//             try {
//                 console.log('yes');
//                 console.log(argument)
//               const data = await approve({ args: argument });
//               console.info("contract call successs", data);
//             } catch (err) {
//               console.error("contract call failure", err);
//             }
//           }

//         if(contract) return (
//             <button onClick={call}>{text}</button>
//         )
//         // <Web3Button
//         //     className="!w-full !px-3.5 !py-2.5 !uppercase !font-semibold !text-white !text-lg !bg-[#111827]/[.95] !rounded-[40px]"
//         //     contractAddress={contractAddress}
//         //     // action={()=>mutateAsync({args:argument, overrides:{gasPrice: 300000}})}
//         //     action={()=>contract.call(argument)}
//         //     theme="light"
//         //     // onError={(error) => {
//         //     //     buyPopup.close();
//         //     //     alert('Error')
//         //     // }}
//         //     // onSuccess={(result) => {
//         //     //     console.log(result)
//         //     //     buyPopup.close();
//         //     //     alert("Success!")
//         //     // }}
//         // >
//         //     {text}
//         // </Web3Button>)
//         else return(
//             <>
//                 <LoadingButton
//                     btnClasses="flex justify-center w-full px-3.5 py-2.5 uppercase font-semibold text-white text-lg bg-[#111827]/[.95] rounded-[40px] cursor-default"
//                     svgClasses="animate-spin w-7 h-7"
//                 />
//             </>);  
//     }
    
    
// }