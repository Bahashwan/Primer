import productABI from '@/blockchain-functions/Contracts/ABI/Product.json';
import rewardABI from '@/blockchain-functions/Contracts/ABI/Reward.json';
import tokenABI from '@/blockchain-functions/Contracts/ABI/Token.json';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';


export const networks = {
    polygon : { 
        testnet: {
            rpcUrls : [
                'https://matic-mumbai.chainstacklabs.com',
                'https://polygon-testnet.public.blastapi.io',
                'https://rpc-mumbai.maticvigil.com',
                'https://rpc.ankr.com/polygon_mumbai',
                'https://polygon-mumbai.blockpi.network/v1/rpc/public'
            ],
            blockExplorerUrls : 'https://mumbai.polygonscan.com/',
            chainName: "Mumbai",
            chainId : 80001
        }
    },
    prodNetwork : {
        RpcForWeb3: 'https://rpc.ankr.com/polygon_mumbai',
        wsForWeb3: 'wss://ws-nd-610-166-887.p2pify.com/53130caa8b7e33f5ab9ab9273f671476',
        rpcUrls : [
            "https://nd-610-166-887.p2pify.com/53130caa8b7e33f5ab9ab9273f671476",
            'https://rpc.ankr.com/polygon_mumbai',
            'https://matic-mumbai.chainstacklabs.com',
            'https://polygon-testnet.public.blastapi.io',
            'https://rpc-mumbai.maticvigil.com',
            'https://polygon-mumbai.blockpi.network/v1/rpc/public'
        ],
        blockExplorerUrls : 'https://mumbai.polygonscan.com/',
        chainName: "Mumbai",
        chainId : 80001,
        nativeCurrency: { 
            decimals: 18, 
            name: "Matic", 
            symbol: "MATIC", 
        }, 
        shortName: "Mumbai", // Display value shown in the wallet UI 
        slug: "matic", // Display value shown in the wallet UI 
        testnet: true, // Boolean indicating whether the chain is a testnet or mainnet 
        chain: "Matic Network", // Name of the network 
        name: "Matic Mumbai Testnet", // Name of the network
    }
}

export const config = {
    contract: {
        product: {
            address: "0xA1C186e2acee3C0D8e33426Ae741372394ed3b58",
            abi: productABI,
        },
        reward: {
            address: "0x9BaEb6055b04cd78192F3eB0914C570353027125",
            abi: rewardABI,
        },
        token: {
            address: "0xC413688017aD85E81137Be85aBA09683dC4dA172",
            abi: tokenABI,
        },
    }
}
const web3Rpc = new Web3(networks.prodNetwork.RpcForWeb3)

//only use to create encodeABI and call
export const ProductContract = new web3Rpc.eth.Contract(config.contract.product.abi as AbiItem[],config.contract.product.address);
export const RewardContract = new web3Rpc.eth.Contract(config.contract.reward.abi as AbiItem[],config.contract.reward.address);
export const TokenContract = new web3Rpc.eth.Contract(config.contract.token.abi as AbiItem[],config.contract.token.address);