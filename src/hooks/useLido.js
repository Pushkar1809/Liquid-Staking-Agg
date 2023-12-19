import { Contract, ZeroAddress, parseEther } from 'ethers';
import LidoABI from "../abis/LidoABI.json";
import WithdrawlQueueABI from "../abis/WithdrawlQueueABI.json";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

export const useLido = () => {
    const { signer, address } = useContext(UserContext);
    const [contracts, setContracts] = useState({
        lido: null,
        withdrawlQueue: null
    })

    const lidoAddress = "0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F";
	const withdrawlQueueAddress = "0xCF117961421cA9e546cD7f50bC73abCdB3039533";

    useEffect(() => {
        const lido = new Contract(lidoAddress, LidoABI, signer);
        const withdrawlQueue = new Contract(
					withdrawlQueueAddress,
					WithdrawlQueueABI,
					signer,
				);
        setContracts({ lido, withdrawlQueue });
		}, [signer]);

    const stake = async (value) => {
        try {
            const amountstETH = await contracts.lido.submit(ZeroAddress, {value});
            // console.log("Staked Successfully!", amountstETH);
        } catch (err) {
            console.error("Failed to Stake", err);
        }
        
    }

    const unstake = async (value) => {
        try {
            const tx = await contracts.withdrawlQueue.requestWithdrawls([value], address);
            // console.log("Unstaked Successfully!", tx);
        } catch (err) {
            console.error("Failed to Unstake", err);
        }
    }

    const approve = async () => {
        try {
            const tx = await contracts.withdrawlQueue.approve(address, parseEther("1000000"));
            // console.log("Approved the token Successfully!", tx);
        } catch (err) {
            console.error("Failed to Approve the token", err);
        }
    }

    const isApproved = async () => {
        try {
            const allowance = await contracts.lido.allowance(address, ZeroAddress);
            return allowance > 0;
        } catch (err) {
            console.error("Failed to check allowance", err);
        }
    };

    return {contracts, stake, unstake, approve, isApproved};
}

