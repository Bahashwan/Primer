import Web3 from 'web3'
import { networks } from './Transaction/Config';
const provider = new Web3(Web3.givenProvider);
//@ts-ignore
export const web3 = new Web3(provider);

