
import { config } from './Config/index';
import { checkConnectMetamask } from "../wallets/metamask";
import { createProductData } from "./Config/createDataTransaction";
import { web3 } from '../web3';
import { axiosCfg } from '@/core-axios';
import axios from 'axios';
import { createBigNumber } from './Config/bigNumber';


interface IPFSData {
    file: File | null;
    name: string;
    description: string
}


export async function createProductMetamask(duration:number,price:number,profitability:number,form:FormData,file:IPFSData) {
    try {
        if(file) {
            const account = await checkConnectMetamask();
            const cost = await createBigNumber(price);
            const IPFS = await createIPFSImage(file);     
            if(IPFS) {
                const data = await createProductData(duration,cost,profitability,IPFS);
                if(account){
                    const createProduct = await web3.eth.sendTransaction({
                        from: account[0],
                        to: config.contract.product.address,
                        value: '0x0',
                        data,
                        gasPrice: await web3.eth.getGasPrice(),
                        gas: 300000
                    }).then((result: any)=>{
                        axiosCfg.post("api/product",form).then(res=>{
                            console.log(res);
                            alert("Create product on DB!");
                        }).catch(error=>{
                            console.error(error);
                            alert("Create DB Error");
                        });  
                        alert("Create product on contract!");
                    })
                    .catch(console.log);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const createIPFSImage =async(data:IPFSData) =>{
    try {
        alert("Wait create IPFS..");
        const url = 'https://api.nft.storage/upload';
        const headers = {
            'Content-Type': 'image/*',
            'Authorization': `Bearer ${process.env.NFT_STORAGE_KEY}`,
        };
        const imageURL = await axios.post(url, data.file, { headers });

        const body = {
            image: `https://${imageURL.data?.value.cid}.ipfs.dweb.link/`,
            name: data.name,
            description: data.description
        }
        
        const response = await axios.post(url, body, { headers });
        return `https://${response.data?.value.cid}.ipfs.dweb.link/`
    } catch (error) {
        console.error(error);
        alert("IPFS create error")
    }
}
