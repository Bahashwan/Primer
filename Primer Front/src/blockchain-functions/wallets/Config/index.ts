
import { web3 } from "@/blockchain-functions/web3"


export function switchNetwork(chainID:number)  {
    return {
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(chainID) }],
    }
}

export function addNetwork(ChainID: number,chainName: string,rpcUrls: string[] | string, blockExplorerUrls: string[] | string) {
    const params = {
        method: 'wallet_addEthereumChain',
        params: [
            {
              chainId: web3.utils.toHex(ChainID),
              chainName: chainName,
              rpcUrls: rpcUrls,
              nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
              blockExplorerUrls: [blockExplorerUrls]
            },
        ],
    }
    return params;
}