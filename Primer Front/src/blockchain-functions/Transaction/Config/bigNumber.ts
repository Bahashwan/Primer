import Web3 from "web3";
import { TokenContract, networks } from ".";

const web3Rpc = new Web3(networks.prodNetwork.RpcForWeb3)

export async function createBigNumber(amount:number) {

    const decimals = await TokenContract.methods.decimals().call();
    //@ts-ignore
    const unit = Object.keys(web3Rpc.utils.unitMap).find((key:string) => web3Rpc.utils.unitMap[key] === web3Rpc.utils.toBN(10).pow(web3Rpc.utils.toBN(decimals)).toString());
    //@ts-ignore
    let newNumber = web3Rpc.utils.toWei(amount.toString(), unit)

    return newNumber;
}