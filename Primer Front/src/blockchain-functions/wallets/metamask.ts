import detectEthereumProvider from '@metamask/detect-provider';
import { web3 } from '../web3';
import MetaMaskOnboarding from '@metamask/onboarding';
import { switchNetwork,addNetwork } from './Config';
import { networks } from '../Transaction/Config';




export async function checkConnectMetamask() {
    try {
        const provider = await detectEthereumProvider().catch(error=>{console.log('MetamaskError')
        console.error(error)});
        if(provider) {
            const accounts = await web3.eth.getAccounts();
            if(accounts.length != 0) {
                const change = await changeNetwork();
                if(change == false) return;
                return accounts;
            }else {
                return false;
            }
        } else {
            return false;
        };
    } catch (error) {
        console.log('MetamaskError')
        console.error(error)
    }
   

}



export async function detectMetamask() {
    const provider:any =await detectEthereumProvider({mustBeMetaMask: true});
    if(provider) {
        
        const accounts = await web3.eth.getAccounts();
        if(accounts.length != 0) {
            const change = await changeNetwork();
            if(change == false) {
                alert("Смените сеть для продолжения!")
                return;
            };
            return accounts;
        } else {
            const accounts: string[] = await provider.request({method: 'eth_requestAccounts'});
            return accounts[0];
        }
    } else {
        alert("Metamask not installed")
        const onboarding = new MetaMaskOnboarding();
        onboarding.startOnboarding();
    };
}


async function changeNetwork() {
    const provider:any =await detectEthereumProvider({mustBeMetaMask: true});
    try {
        const params = await switchNetwork(networks.prodNetwork.chainId);
        await provider.request(params);
      } catch (switchError : any) {
            if (switchError.code === 4902) {
                try {
                    const params = addNetwork(
                        networks.prodNetwork.chainId,
                        networks.prodNetwork.chainName,
                        networks.prodNetwork.rpcUrls,
                        networks.prodNetwork.blockExplorerUrls
                    );
                    console.log(params)
                    await provider.request(params);
                } catch (addError) {
                    console.log(addError)
                }
            }
            if(switchError.code === 4001) {
                return false;
            } 
        }
}