import { AbiItem } from "web3-utils";
import { config, networks } from ".";
import Web3 from "web3";
const web3Rpc = new Web3(networks.prodNetwork.RpcForWeb3)
export async function allowanceUser(address:string) {

    const TokenContract = new web3Rpc.eth.Contract(config.contract.token.abi as AbiItem[],config.contract.token.address)
    let allowanceUser = await TokenContract.methods.allowance(
        address,
        config.contract.product.address
    ).call();
    
    return allowanceUser
}