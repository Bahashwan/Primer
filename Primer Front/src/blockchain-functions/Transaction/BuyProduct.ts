import { checkConnectMetamask } from '../wallets/metamask';
import { config } from './Config';
import { createBigNumber } from './Config/bigNumber';
import { createApproveData, createBuyProductData } from './Config/createDataTransaction';
import { allowanceUser } from './Config/getAllowanceUser';
import { web3 } from '../web3';
import { getEstimateGas } from './Config/getEstimateGas';
import {useButtonVerificationStore} from "@/store/check-status-store";

export async function metamaskBuy(cost: number, id: number, amount: number) {
    const {removeLoading,addLoading} = useButtonVerificationStore.getState();
    try {
        addLoading();
        let price = await createBigNumber(cost * amount);

        const account = await checkConnectMetamask();
        if(account) {
            const allowance = await allowanceUser(account[0]);

            const dataBuyProduct = await createBuyProductData(account[0],id,amount);
            if(+price> +allowance) {

                const dataApprove = await createApproveData(price);
                const gasApprove = await getEstimateGas(account[0],config.contract.token.address,dataApprove);

                
                //approve
                const approve = await web3.eth.sendTransaction({
                    from: account[0],
                    to: config.contract.token.address,
                    value: '0x0',
                    data: dataApprove,
                    gasPrice: await web3.eth.getGasPrice(),
                    gas: gasApprove
                });
                console.log(approve)
                //buy
                if(approve.status) {
                    console.log("Approve complete")
                    const gasBuyProduct = await getEstimateGas(account[0],config.contract.product.address,dataBuyProduct);
                    const buy = await web3.eth.sendTransaction({
                        from: account[0],
                        to: config.contract.product.address,
                        value: '0x0',
                        data: dataBuyProduct,
                        gasPrice: await web3.eth.getGasPrice(),
                        gas: gasBuyProduct
                    });

                    if(buy.status) {
                        removeLoading()
                        alert("Buy product!")
                    }
                    else {
                        removeLoading()
                        alert('Error buy')
                    }
                    console.log(buy)
                } else {
                    removeLoading()
                    alert('approve error')
                }
            } else {
                //buy
                const gasBuyProduct = await getEstimateGas(account[0],config.contract.product.address,dataBuyProduct);
                const buy = await web3.eth.sendTransaction({
                    from: account[0],
                    to: config.contract.product.address,
                    value: '0x0',
                    data: dataBuyProduct,
                    gasPrice :  await web3.eth.getGasPrice(),
                    gas : gasBuyProduct
                });
                if(buy.status) {
                    removeLoading()
                    alert("Buy product!")
                }
                else {
                    removeLoading()
                    alert('Error buy')
                }
                console.log(buy)
            }
        } else {
            removeLoading();

        }
    } catch (error) {
        removeLoading()
        console.error(error)
    }
}
