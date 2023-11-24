import { axiosCfg } from "@/core-axios";
import { useEffect, useState } from "react";

import { WalletConnectV1 } from "@thirdweb-dev/wallets";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { config } from "@/blockchain-functions/Transaction/Config";
import Product from "@/components/productCard";
import { Pagination } from "@/components/pagination";
import { ProductType } from "@/components/cards";

interface Products {
    max_pages: number,
    page: number,
    limit: number,
    data: ProductType[] | "loading",
    data_count: number
}

export default function Change() {
    const [products,setProducts] = useState([]);
    const [data,setData] = useState<Products | []>([]);
    const [page,setPage] = useState(1);

    const [walletconnect,setWalletConnect] = useState<boolean | null>(null);

    const wallet = new WalletConnectV1({qrcode:false});

    useEffect(()=>{
        axiosCfg.get(`api/product?page=${page}`).then(res=>{
            const data = res.data;

            const products = res.data.data;
            axiosCfg.get(`api/product?page=${page}&is_hidden=true`).then(res=>{

                //add or remove
                // data.max_pages+=res.data.max_pages;
                setData(data);
                res.data.data.map((el:any)=>{
                    products.push(el);
                })
                
                setProducts(products);
                console.log(products)
            })
            // console.log(res.data.max_pages)
        });
    },[ page])


    useEffect(()=>{
        (async()=>{
            const walletconnect = await wallet.connect();
            if(walletconnect) setWalletConnect(true);
        })()
    },[]);

    const {contract} = useContract(config.contract.product.address, config.contract.product.abi);
    const {mutateAsync} = useContractWrite(
        contract,
        "changeProductInfo",
    );
    const changeURI = useContractWrite(
        contract,
        "setURI",
    );
    return (
        <div className="mt-[80px]">
            {products.map((el:any)=>(
                <div
                    key={el.id}
                    className="flex justify-center my-10"
                >
                  <Product 
                    card={el}
                    walletconnect={walletconnect}
                    changeProductInfo={mutateAsync}
                    // changeURI={changeURI.mutateAsync}
                  />  
                   
                </div>
            ))}
            {!Array.isArray(data) && <Pagination classes="justify-center" onPageChange={page=>setPage(page)} currentPage={page} totalPageCount={data?.max_pages}/> }
        </div>
    )
}