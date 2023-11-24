import { TokenContract,ProductContract, config, RewardContract } from ".";


export async function createApproveData(price: string) {
    const data = await TokenContract.methods.approve(config.contract.product.address,price).encodeABI();
    return data;
}

export async function createBuyProductData(address:string,id:number,amount:number) {
    const data = await ProductContract.methods.buyProduct(address,id,amount).encodeABI();
    return data;
}
export async function createRewardData(id:number,address:string,amount:number) {
    const data = await RewardContract.methods.rewardForProduct(id,address,amount).encodeABI();
    return data;
}
export async function createChangeProductData(id:number,dur:number,cost:string,proft:number,isActive:boolean) {
    const data = await ProductContract.methods.changeProductInfo(id,dur,cost,proft,isActive).encodeABI();
    return data
}
export async function createProductData(dur:number,cost:string,proft:number,IPFS:string) {
    const data = await ProductContract.methods.createNewProduct(cost,dur,IPFS,proft).encodeABI();
    return data
}
export async function createChangeIPFSData(id:number,uri:string) {
    const data = await ProductContract.methods.setURI(id,uri).encodeABI();
    return data;
}