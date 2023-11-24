import { config, networks } from "./Config";
import { checkConnectMetamask } from "../wallets/metamask";

import { createRewardData } from './Config/createDataTransaction';
import { web3 } from '../web3';
import { axiosCfg } from "@/core-axios";


export async function metamaskReward(address:string, id:number, amount:number) {
    try {
        const account = await checkConnectMetamask();
        const data = await createRewardData(id,address,amount)
        if(account){
            const reward = await web3.eth.sendTransaction({
                from: account[0],
                to: config.contract.token.address,
                value: '0x0',
                data,
                gasPrice: await web3.eth.getGasPrice(),
                gas: 300000
            }).then((result: any)=>{
                axiosCfg.get(`api/product/paid/${id}`).then(res=>{
                    console.log(res);
                    alert("Reward Success");
                })
                console.log(result)
                alert("Reward Product")
            })
            .catch(console.log);
        }
        
    } catch (error) {
        console.log(error);
    }
}
