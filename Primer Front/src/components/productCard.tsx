import { changeIPFS, changeProductMetamask } from "@/blockchain-functions/Transaction/ChangeProduct";
import { config } from "@/blockchain-functions/Transaction/Config";
import { createIPFSImage } from "@/blockchain-functions/Transaction/CreateProduct";
import { axiosCfg } from "@/core-axios";
import { AuctionAlreadyStartedError, Web3Button } from "@thirdweb-dev/react";
import NextImage from "next/image";
import { ChangeEvent, useState } from "react";
import WalletConnect from "@walletconnect/client";
import { createCustomRequest } from "@/blockchain-functions/Transaction/Config/sendTransaction";
import { validateStatus } from "@/blockchain-functions/Transaction/Config/ValidateTransaction";
import { createChangeIPFSData, createChangeProductData } from "@/blockchain-functions/Transaction/Config/createDataTransaction";
import { createBigNumber } from "@/blockchain-functions/Transaction/Config/bigNumber";


type getProductType = {
    card: productType,
    walletconnect: boolean | null,
    changeProductInfo: any,
    changeURI?: any
}

type productType = {
    createAt: string,
    description: string,
    expiration: number,
    id: number,
    isBest: boolean,
    isHidden: boolean,
    isPopular: boolean,
    isTrending: boolean,
    minimalSum:number,
    name:string,
    photo_url:string,
    price:number,
    profitability: number,
    updateAt: string
}

export default function Product({card,walletconnect,changeProductInfo,changeURI}:getProductType) {
    const [product,setProduct] = useState<productType>(card);

    const [name,setName] = useState<string>(product.name);
    const [description,setDescription] =  useState<string>(product.description);
    const [price,setPrice] = useState<number>(product.price);
    const [minimalSum,setMinimalSum] = useState<number>(product.minimalSum);
    const [expiration,setExpiration] = useState<number>(product.expiration);
    const [profitability,setProfitability] = useState<number>(product.profitability);
    const [isPopular,setIsPopular] =  useState<boolean>(product.isPopular);
    const [isBest,setIsBest] = useState<boolean>(product.isBest);
    const [isTrending,setIsTrending] = useState<boolean>(product.isTrending);
    const [active,setActive] = useState<boolean>(product.isHidden);
    
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        setFile(selectedFile);
    }
    
    const createFormData = () =>{
        const formData = new FormData();
        if(name != product.name && name.length != 0) formData.append('name', name);
        if(description != product.description && description.length != 0) formData.append('description', description);
        if(minimalSum != product.minimalSum && (minimalSum+"").length != 0) formData.append('minimalSum', minimalSum + "");
        if(isPopular != product.isPopular) formData.append('isPopular', isPopular + "");
        if(isBest != product.isBest) formData.append('isBest', isBest + "");
        if(isTrending != product.isTrending) formData.append('isTrending', isTrending + "");
        if (file) formData.append('photo', file);
        return formData;
    };

    const createFormDataWeb3 =()=>{
        const formData = new FormData();
        if(price != product.price && (price+"").length != 0) formData.append('price', price + "");
        if(expiration != product.expiration && (expiration+"").length != 0) formData.append('expiration', expiration + "");
        if(profitability != product.profitability && (profitability+"").length != 0) formData.append('profitability', profitability + "");
        if(active != product.isHidden) formData.append('isHidden', active + "");
        return formData;
    }

    const sendServer = ()=>{
        const form = createFormData();
        axiosCfg.patch(`/api/product/${product.id}`,form).then(res=>{
            console.log(res);
            setProduct(res.data)
            alert("Product changed")
        })
        .catch(error=>{
            console.error(error);
            alert("error")
        });
    }
    const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
    });
    const changeProduct = async()=>{
        try {
            const cost = await createBigNumber(price);
            const data = await createChangeProductData(product.id,expiration,cost,profitability,active);
            const address = connector.accounts[0];
            if(data && address) {
                const customRequest = await createCustomRequest(
                    address,
                    config.contract.product.address,
                    data,
                    "0x0"
                );
                await connector.sendCustomRequest(customRequest)
                 .then(async (res:any)=>{
                    let statusResult = await validateStatus(res);
                    if(statusResult.txStatus) {
                        axiosCfg.patch(`/api/product/${product.id}`,createFormDataWeb3()).then(res=>{
                            setProduct(res.data);
                            alert("Change Params DB!");
                        }).catch(error=>{
                            console.error(error);
                            alert("Error change params DB");
                        })
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
    
    async function sendSetURI() {
        try {
            const IPFSData = {
                file:file,
                name:name,
                description:description
            }
            const address = connector.accounts[0];
            const IPFS = await createIPFSImage(IPFSData);
            if(IPFS) {
                console.log(IPFS)
                const data = await createChangeIPFSData(product.id,IPFS);
                const customRequest = await createCustomRequest(
                    address,
                    config.contract.product.address,
                    data,
                    "0x0"
                );
                await connector.sendCustomRequest(customRequest)
                 .then(async (res:any)=>{
                    let statusResult = await validateStatus(res);
                    if(statusResult.txStatus) {
                        const formData = new FormData();
                        if (IPFSData.file) formData.append('photo', IPFSData.file);
                        axiosCfg.patch(`/api/product/${product.id}`,formData).then(res=>{
                            setProduct(res.data)
                            alert("Change Params DB!");
                        }).catch(error=>{
                            console.error(error);
                            alert("Error change params DB");
                        })
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

    return (
        <div className="flex justify-center gap-5 ">
            
            <div className="flex flex-col gap-2">
                <NextImage 
                    className="w-64 h-64 mx-auto"
                    src={`${process.env.BASE_URL}` + '/image/' + product.photo_url }
                    alt="img"
                    width={128}
                    height={128}
                />
               <input className="mx-auto flex mb-5" type="file" accept=".jpeg, .png, .svg, .jpg" onChange={handleChange}/>
               <div className="">
                {walletconnect ? 
                    <button 
                        className=" !px-3.5 !py-2.5 !uppercase !font-semibold !text-white !text-xs !bg-[#111827]/[.95] !rounded-[40px]"
                        onClick={sendSetURI}
                    >
                        Change IPFS
                    </button>
                    
                    :
                    <button
                        className="!px-3.5 !py-2.5 !uppercase !font-semibold !text-white !text-xs !bg-[#111827]/[.95] !rounded-[40px]"
                        onClick={()=>
                            changeIPFS(
                            product.id,
                            {file:file,name:name,description:description}
                        )}
                    >Change IPFS</button>}
               </div>
               <div className="flex justify-between">
                    <button className="
                        !px-3.5 !py-2.5 
                        !uppercase !font-semibold 
                        !text-white !text-xs 
                        !bg-[#111827]/[.95] !rounded-[40px]
                    " onClick={sendServer}>
                        Change Server
                    </button>
                    {walletconnect ? (
                        <button
                        className="!px-3.5 !py-2.5 !uppercase !font-semibold !text-white !text-xs !bg-[#111827]/[.95] !rounded-[40px]"
                            onClick={changeProduct}
                        > 
                            Change Params
                        </button>
                    ) : (
                    <button 
                        className="!px-3.5 !py-2.5 !uppercase !font-semibold !text-white !text-xs !bg-[#111827]/[.95] !rounded-[40px]"
                        onClick={()=>
                            changeProductMetamask(
                                product.id,
                                expiration,
                                price,
                                profitability,
                                active,
                                createFormDataWeb3()
                            )
                        }
                    >
                        Change Params
                    </button>
                )}
                </div>
            </div>
            
            <div className="flex flex-col gap-5 justify-center">
                <h1>isHidden: {product.isHidden+""}</h1>
                <label className="flex gap-2">
                    <input checked={active} onChange={e=>setActive(e.target.checked)} type="checkbox" placeholder="ff"/>
                    isHidden (нажмите чтобы сделать продукт неактивным) 
                </label>
                <h1>Name: {product.name}</h1>
                <input onChange={e=>setName(e.target.value)} placeholder="Name" type="text"/>
                <h1 className="max-w-[400px] max-h-[200px] overflow-y-auto">Description: {product.description}</h1>
                <input onChange={e=>setDescription(e.target.value)} placeholder="Description" type="text"/>
                <h2>Price: {product.price}</h2>
                <input onChange={e=>{setPrice(+(e.target.value))}}  placeholder="Price" type="number"/>
                <h2>Profitability: {product.profitability}</h2>
                <input onChange={e=>{setProfitability(+(e.target.value))}} placeholder="Profitability" type="number"/>
                <h2>Expiration: {product.expiration}</h2>
                <input onChange={e=>{setExpiration(+(e.target.value))}} placeholder="Expiration" type="number"/>
                <h2>minimalSum: {product.minimalSum}</h2>
                <input onChange={e=>{setMinimalSum(+(e.target.value))}} placeholder="minimalSum" type="number"/>
                <div>
                    <h1>isTrending: {product.isTrending+""}</h1>
                    <label className="flex gap-2">
                        <input checked={isTrending} onChange={e=>setIsTrending(e.target.checked)} type="checkbox" placeholder="trend"/>
                        isTrending
                    </label>
                </div>
                
                <div>
                    <h1>isPopular: {product.isPopular+""}</h1>
                    <label className="flex gap-2">
                        <input checked={isPopular} onChange={e=>setIsPopular(e.target.checked)} type="checkbox" placeholder="trend"/>
                        isPopular
                    </label>
                </div>
                
                <div>
                    <h1>isBest: {product.isBest+""}</h1>
                    <label className="flex gap-2">
                        <input checked={isBest} onChange={e=>setIsBest(e.target.checked)} type="checkbox" placeholder="trend"/>
                        isBest
                    </label>
                </div>
                
                
               
            </div>
        </div>
    )
}



// <Web3Button
//     className="!px-3.5 !py-2.5 !uppercase !font-semibold !text-white !text-xs !bg-[#111827]/[.95] !rounded-[40px]"
//     contractAddress={config.contract.product.address}
//     action={async()=>{
//         const IPFS = createIPFSImage({file:file,name:name,description:description})
//         changeURI({args:[
//             product.id,
//             IPFS
//         ]})}}
//     theme="light"
//     onSuccess={()=>{
//         alert("Change uri product!")
//     }}
//     onError={()=>{
//         alert("Error");
//     }}
// >
// Change IPFS
// </Web3Button> 



//  Change
{/* <Web3Button
        className="!px-3.5 !py-2.5 !uppercase !font-semibold !text-white !text-xs !bg-[#111827]/[.95] !rounded-[40px]"
        contractAddress={config.contract.product.address}
        action={async()=>{
            const cost = await createBigNumber(price);
            changeProductInfo({args:[
                product.id,
                expiration,
                cost,
                profitability,
                active
            ]})
        }}
        theme="light"
        onSuccess={()=>{
            axiosCfg.patch(`/api/product${product.id}`,createFormDataWeb3()).then(res=>{
                console.log(res);
                alert("Change Params DB!");
            }).catch(error=>{
                console.error(error);
                alert("Error change params DB");
            });
            alert("Change Params Product!");
        }}
        onError={()=>{
            alert("Error")
        }}
    >
        Change Params
    </Web3Button>  */}