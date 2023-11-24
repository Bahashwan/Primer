import Web3 from "web3";
import { networks } from ".";
const web3Rpc = new Web3(networks.prodNetwork.RpcForWeb3)
export async function createCustomRequest(
    from:string | undefined,
    to:string,
    data:any,
    value: string,
    
) {
    let gasPrice = await web3Rpc.utils.toHex(Number((Number(web3Rpc.utils.fromWei(await web3Rpc.eth.getGasPrice(), 'gwei')) + 2).toFixed()) * 1e9);
    let nonce;
    if(from != undefined) nonce = await web3Rpc.eth.getTransactionCount(from);
    const tx = {
        from: from,
        to: to,
        data: data,
        gasPrice: gasPrice,
        gas: 300000,
        value: value,
        nonce: nonce,
    };

    const customRequest = {
        id: Date.now(),
        jsonrpc: "2.0",
        method: "eth_sendTransaction",
        params: [tx],
    };
    return customRequest;
}