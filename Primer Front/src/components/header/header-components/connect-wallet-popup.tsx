import {Fragment} from "react";
import {Icon} from "@/components/sprite-icons";
import {inter} from "@/styles/fonts";
import {Dialog, Transition} from "@headlessui/react";
import {addPaddingPage, removePaddingPage} from "@/utils";
import {usePopupStore} from "@/store/toggle-stores";
import { entranceMetamask,entranceWalletConnect } from "@/blockchain-functions/Auth";
import { useConnect, walletConnect,useDisconnect  } from "@thirdweb-dev/react";



export function ConnectWalletPopup() {
    const popup = usePopupStore();

    const connect = useConnect();
    const disconnect = useDisconnect();
    const handleConnect = async () => {
        try {
            const walletConnectConfig = walletConnect({
                projectId: process.env.walletconnectId as string
            });
            await disconnect();
            const wallet = await connect(walletConnectConfig);
            if(wallet) await entranceWalletConnect();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Transition show={popup.isOpen} as={Fragment} beforeEnter={addPaddingPage} afterLeave={removePaddingPage}>
            <Dialog as="div" className={"relative z-50 " + `${inter.variable} font-sans`} onClose={() => popup.close()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out transition-[opacity] duration-150 sm:ease-smoothly-gentle sm:duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in transition-[opacity] duration-150 sm:ease-smoothly-gentle sm:duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="backdrop-blur bg-black/[0.50] improve-performance fixed inset-0" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto sm:overflow-hidden sm:static">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:block sm:p-0 sm:static">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-150 transition-[opacity,transform] sm:ease-smoothly-gentle sm:transition-[transform] sm:duration-500"
                            enterFrom="opacity-0 scale-95 sm:scale-100 sm:opacity-100 sm:transform3d-y-full"
                            enterTo="opacity-100 scale-100 sm:transform3d-0"
                            leave="ease-in duration-150 transition-[opacity,transform] sm:ease-smoothly-gentle sm:transition-[transform] sm:duration-500"
                            leaveFrom="opacity-100 scale-100 sm:transform3d-0"
                            leaveTo="opacity-0 scale-95 sm:scale-100 sm:opacity-100 sm:transform3d-y-full"
                        >
                            <Dialog.Panel className="relative w-full max-w-[360px] overflow-hidden rounded-3xl bg-white py-14 px-8 shadow-xl sm:max-w-none sm:rounded-b-none sm:fixed sm:bottom-0 sm:right-0 sm:left-0">
                                <div onClick={() => popup.close()} className="absolute cursor-pointer top-6 right-6">
                                    <Icon name="close" className="w-[18px] h-[18px]"/>
                                </div>

                                <Dialog.Title
                                    as="h2"
                                    className="text-2xl font-bold text-black text-center mb-5"
                                >
                                    Select a wallet
                                </Dialog.Title>
                                <Dialog.Description as="p" className="text-center text-base mb-5 text-greyish-purplish-blue font-normal">
                                    By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.
                                </Dialog.Description>

                                <div className="flex flex-col items-center space-y-8 mb-10">
                                    <button
                                        type="button"
                                        onClick={handleConnect}
                                        className="flex items-center justify-between rounded-[80px] bg-dark-purplish-blue text-white font-semibold shadow-btn text-base shadow-btn w-[240px] py-3 px-6"
                                    >
                                        WalletConnect
                                        <Icon name="wallet-connect" className="fill-white w-8 h-5"/>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={entranceMetamask}
                                        className="flex items-center justify-between rounded-[80px] bg-[#E5E7EB] text-dark-purplish-blue font-semibold text-base shadow-btn w-[240px] py-3 px-6"
                                    >
                                        MetaMask
                                        <div className="w-8 flex items-center justify-center">
                                            <Icon name="metamask" className="w-7 h-6"/>
                                        </div>

                                    </button>
                                </div>
                                <div className="text-center text-base font-semibold mb-2 text-black">New to crypto?</div>
                                <div className="text-base font-normal text-greyish-purplish-blue text-center cursor-pointer underline">Learn about wallets</div>
                            </Dialog.Panel>
                            
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}