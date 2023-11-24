import { config } from './Config/index';
import { checkConnectMetamask } from "../wallets/metamask";
import { createChangeIPFSData, createChangeProductData } from "./Config/createDataTransaction";

import { web3 } from '../web3';
import { axiosCfg } from '@/core-axios';
import { createBigNumber } from './Config/bigNumber';
import Web3 from 'web3';
import { createIPFSImage } from './CreateProduct';






export async function changeProductMetamask(id:number,duration:number,price:number,profitability:number,isActive:boolean,form:FormData) {
    try {
        const account = await checkConnectMetamask();
        const cost = await createBigNumber(price);
        const data = await createChangeProductData(id,duration,cost,profitability,isActive);
        if(account && data){
            // const provider = new Web3( Web3.givenProvider());
            console.log(new Web3(new Web3().givenProvider))
            // const web3 = new Web3(provider);
            await web3.eth.sendTransaction({
                from: account[0],
                to: config.contract.product.address,
                value: '0x0',
                data,
                gasPrice: await web3.eth.getGasPrice(),
                gas:300000
            }).then((result: any)=>{
                console.log(result);
                axiosCfg.patch(`/api/product/${id}`,form).then(res=>{
                    console.log(res);
                    alert("Change Params DB!");
                }).catch(error=>{
                    console.error(error);
                    alert("Error change params DB");
                })
                alert("Change Params Product!");
            })
            .catch(error=>{
                console.error(error)
                alert('Error');
            });
        }
        
    } catch (error) {
        console.log(error);
    }
}
interface IPFSData {
    file: File | null;
    name: string;
    description: string
}
export const changeIPFS = async(id:number,IPFSData:IPFSData)=>{
    const account = await checkConnectMetamask();
    
    const IPFS = await createIPFSImage(IPFSData);
    if(IPFS && account) {
        const data = await createChangeIPFSData(id,IPFS);
        await web3.eth.sendTransaction({
            from: account[0],
            to: config.contract.product.address,
            value: '0x0',
            data,
            gasPrice: await web3.eth.getGasPrice(),
            gas:300000
        }).then((result)=>{
            console.log(result);
            const formData = new FormData();
            if(IPFSData.file) formData.append('photo', IPFSData.file);
            axiosCfg.patch(`/api/product/${id}`,formData).then(res=>{
                console.log(res);
                alert("Change Params DB!");
            }).catch(error=>{
                console.error(error);
                alert("Error change params DB");
            })
            alert("Change Params Product!");
        })
        .catch(error=>{
            console.error(error)
            alert('Error');
        });
    }

}

