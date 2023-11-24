import Web3 from "web3";
import { networks } from ".";

const web3Rpc = new Web3(networks.prodNetwork.RpcForWeb3)
export async function getEstimateGas(from:string,to:string, data:any) {
    const gas = await web3Rpc.eth.estimateGas({
        from: from,
        to: to,
        data: data
    })
    return gas;
}