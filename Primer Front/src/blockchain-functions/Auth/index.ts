import {usePopupStore} from '@/store/toggle-stores';
import {StatusAuthentication, useAuthorizationStore} from "@/store/authorization-store";
import {detectMetamask} from "@/blockchain-functions/wallets/metamask";
import { web3 } from "@/blockchain-functions/web3";
import { axiosCfg } from "@/core-axios";
import { WalletConnect } from "@thirdweb-dev/wallets";
const {close} = usePopupStore.getState();

export async function entranceMetamask() {
    try {
        const accounts = await detectMetamask();
        if(accounts!=undefined) await signature(accounts);
    } catch (error) {
        console.log('metamaskError')
        console.error(error)
    }
}
async function signature(account: string | string[]) {
    try {
        const method = "eth_signTypedData_v4";
        const signature: string = await web3.eth.personal.sign(process.env.SIGNATURE_TEXT as string, Array.isArray(account) ? account[0] : account, method);
        console.log(signature)
        if(signature) await postRequest(Array.isArray(account) ? account[0] : account,signature);
    } catch (error) {
        console.log('metamaskError')
        console.error(error)
    }
}

export async function disconnectWalletConnect() {
    const wallet = new WalletConnect({qrcode:false});
    await wallet.connect();
    await wallet.disconnect();
    axiosCfg.get('/api/auth/logout').catch(console.error)

}

export async function entranceWalletConnect() {
    try {
        const wallet = new WalletConnect({
            projectId: process.env.walletconnectId as string,
            qrcode: false
        });
    
        await wallet.connect().catch(console.error);
        

        const address = await wallet.getAddress().catch(console.error);
        const signature = await wallet.signMessage(process.env.SIGNATURE_TEXT as string).catch(console.error);
            
        if(address && signature) await postRequest(address,signature);

        wallet.on("disconnect", ()=>{
            console.log("Disconnect");
            axiosCfg.get('/api/auth/logout').catch(console.error)
        });
    } catch (error) {
        console.log('WalletConnectError');
        console.error(error)
    }
}

async function postRequest(address: string, signature: string) {
    try {
        axiosCfg.post('/api/auth/login', {
            "address": address.toLowerCase(),
            "signature": signature.toLowerCase()
        }).then((result) => {
            alert("Вы вошли в аккаунт")
            const {set} = useAuthorizationStore.getState()
            set(result.data.address, StatusAuthentication.AUTHENTICATION)
            close();
        }).catch(async (error) => {
            if (error?.response?.data?.message == "User not found.") {
                axiosCfg.post('/api/auth/register', {
                    "address": address.toLowerCase(),
                    "signature": signature.toLowerCase()
                })
                .then((result) => {  
                    alert("Вы зарегистрировались");
                    const {set} = useAuthorizationStore.getState();
                    set(result.data.address, StatusAuthentication.AUTHENTICATION)
                    close();
                })
                .catch(async(error) => {
                    const {set} = useAuthorizationStore.getState();
                    set("", StatusAuthentication.NOT_AUTHENTICATION);
                    
                })
            }
        });
    } catch (error) {
        console.error(error)   
    }
}
