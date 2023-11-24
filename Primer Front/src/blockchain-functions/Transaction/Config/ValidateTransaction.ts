import Web3 from "web3";
import { networks } from ".";

const web3Rpc = new Web3(networks.prodNetwork.RpcForWeb3)
const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));

export async function validateStatus(hash:string) {
    let _txStatus;
    while(_txStatus === undefined) {
        await sleep(2000);

        let txData = await web3Rpc.eth.getTransactionReceipt(hash)
        console.log(txData);
        if(txData?.status) {
            _txStatus = txData.status
        }else if(txData?.status == false){
            return {txStatus: _txStatus, txHash: hash}
        }
    }

    return {txStatus: _txStatus, txHash: hash}
}
