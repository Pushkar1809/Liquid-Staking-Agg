import { Contract, ZeroAddress } from 'ethers';
import LidoABI from "../abis/LidoABI.json";
import WithdrawlQueueABI from "../abis/WithdrawlQueueABI.json";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useLido = () => {
    const {provider, signer} = useContext(UserContext);

    const lidoAddress = "0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F";
	const withdrawlQueueAddress = "0xCF117961421cA9e546cD7f50bC73abCdB3039533";

    
    const withdrawlQueue = new Contract(withdrawlQueueAddress, WithdrawlQueueABI, provider);

    const stake = async (value) => {
        const lido = new Contract(lidoAddress, LidoABI, signer);
        const amountstETH = await lido.submit(ZeroAddress, {value});
        return amountstETH;
    }

    const unstake = () => {

    }

    const approve = () => {

    }

    return {stake, unstake, approve};
}

