import { config } from "@/blockchain-functions/Transaction/Config";
import { createIPFSImage, createProductMetamask } from "@/blockchain-functions/Transaction/CreateProduct";
import { axiosCfg } from "@/core-axios";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import { WalletConnectV1 } from "@thirdweb-dev/wallets";

import { useEffect, useState,ChangeEvent } from "react";

export default function Create() {

    const [name,setName] = useState<string>("");
    const [description,setDescription] =  useState<string>("");
    const [price,setPrice] = useState<number>(0);
    const [minimalSum,setMinimalSum] = useState<number>(0);
    const [expiration,setExpiration] = useState<number>(0);
    const [profitability,setProfitability] = useState<number>(0);
    const [isPopular,setIsPopular] =  useState<boolean>(false);
    const [isBest,setIsBest] = useState<boolean>(false);
    const [isTrending,setIsTrending] = useState<boolean>(false);
    // const [active,setActive] = useState<boolean>(false);

    const [walletconnect,setWalletConnect] = useState<boolean | null>(null);

    const wallet = new WalletConnectV1({qrcode:false});

    useEffect(()=>{
        (async()=>{
            const walletconnect = await wallet.connect();
            if(walletconnect) setWalletConnect(true);
        })();
    },[]);

    const [file, setFile] = useState<File | null>(null);
    

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        setFile(selectedFile);
    }  

    // const connector = new WalletConnect({
    //     bridge: "https://bridge.walletconnect.org",
    // });

    // const createProduct = async()=>{
    //     try {
           
    //         const IPFSData = {
    //             file:file,
    //             name:name,
    //             description:description
    //         }
    //         const IPFS = await createIPFSImage(IPFSData);
    //         const cost = await createBigNumber(price);
    //         const address = connector.accounts[0];
    //         if(IPFS) {
    //             const data = await createProductData(expiration,cost,profitability,IPFS);
    //             if(data) {
    //                 const customRequest = await createCustomRequest(
    //                     address,
    //                     config.contract.product.address,
    //                     data,
    //                     "0x0"
    //                 );
    //                 await connector.sendCustomRequest(customRequest)
    //                  .then(async (res:any)=>{
    //                     let statusResult = await validateStatus(res);
    //                     if(statusResult.txStatus) {
    //                         axiosCfg.post("api/product",createFormData).then(res=>{
    //                             console.log(res);
    //                             alert("Create product on DB!");
    //                         }).catch(error=>{
    //                             console.error(error);
    //                             alert("Create DB Error");
    //                         });  
    //                         alert("Success");
    //                     }
    //                     else alert('error');
    //                  })
    //                  .catch(console.error);
    //             }
    //         }
            
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    const createFormData = () =>{
        const formData = new FormData();
        if (file) formData.append('photo', file);
        formData.append('name',name);
        formData.append('description',description);
        formData.append('price', price+"");
        formData.append('minimalSum', minimalSum +"");
        formData.append('expiration', expiration+"");
        formData.append('profitability', profitability+"");
        formData.append('isPopular', isPopular+"");
        formData.append('isBest', isBest+"");
        formData.append('isTrending', isTrending+"");
        
        return formData;
    };

    const {contract} = useContract(config.contract.product.address, config.contract.product.abi);
    const {mutateAsync} = useContractWrite(
        contract,
        "createNewProduct",
    );

    return (
        <div className="mt-[80px] ">
            <h1 className="text-center text-4xl my-5">Create</h1>
            <input className="mx-auto flex mb-10" type="file" onChange={handleChange}/>
            <div className="flex flex-wrap gap-5 mx-auto max-w-[700px]">

                <input onChange={e=>setName(e.target.value)} type="text" placeholder="name"/>
                <input onChange={e=>setDescription(e.target.value)} type="text" placeholder="description"/>
                <input onChange={e=>setPrice(+(e.target.value))} type="number" placeholder="price"/>
                <input onChange={e=>setMinimalSum(+(e.target.value))} type="number" placeholder="minimalSum"/>
                <input onChange={e=>setExpiration(+(e.target.value))} type="number" placeholder="expiration"/>
                <input onChange={e=>setProfitability(+(e.target.value))} type="number" placeholder="profitability"/>

                <label htmlFor="isPopular" className="flex gap-2">
                    <input onChange={e=>setIsPopular(e.target.checked)} type="checkbox" id="isPopular"/>
                    isPopular 
                </label>

                <label htmlFor="isBest" className="flex gap-2">
                    <input onChange={e=>setIsBest(e.target.checked)} type="checkbox" id="isBest"/>
                    isBest 
                </label>
                <label htmlFor="isTrending" className="flex gap-2">
                    <input onChange={e=>setIsTrending(e.target.checked)} type="checkbox" id="isTrending"/>
                    isTrending 
                </label>    
            </div>
            <div className="text-center my-5">
                <div className="inline-block px-4 py-2 border-2 border-black rounded-3xl">
                    {walletconnect ? (
                                        // <button onClick={createProduct}>Create Product</button>
                        <Web3Button
                            contractAddress={config.contract.product.address}
                            action={async()=>{
                                const IPFS = await createIPFSImage({file:file,name:name,description:description})
                                
                                mutateAsync({args:[
                                    price,
                                    expiration,
                                    IPFS,
                                    profitability]
                                })
                            }}
                            onSuccess={()=>axiosCfg.post("api/product",createFormData)}
                        >
                            Create Product
                        </Web3Button>
                   ) : (
                        <button
                            onClick={()=>{
                                if(!file) {alert("Not found img");return};
                                createProductMetamask(
                                    expiration,
                                    price,
                                    profitability,
                                    createFormData(),
                                    {file:file,name:name,description:description}
                                )
                        }}
                        >
                            Create Product
                        </button>
                        
                    )}
                    
                </div>
                <button onClick={()=>{
                        axiosCfg.post("api/product", createFormData()).then(res=>{
                            console.log(res);
                            alert("Create product on DB!");
                        }).catch(error=>{
                            console.error(error);
                            alert("Create DB Error");
                        });  
                    }}>Create Product on DB</button>
            </div>
            
        </div>
    )
}


