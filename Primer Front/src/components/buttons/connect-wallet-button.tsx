import {usePopupStore} from "@/store/toggle-stores";

type ConnectWalletButtonType = {
    classes?: string
}

export function ConnectWalletButton({classes}: ConnectWalletButtonType) {
    const popup = usePopupStore();
    return (
        <button onClick={() => popup.open()} className={classes}>Connect Wallet</button>
    )
}