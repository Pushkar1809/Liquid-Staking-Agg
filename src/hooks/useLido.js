import { Contract, ZeroAddress, parseEther, formatUnits } from 'ethers';
import LidoABI from "../abis/LidoABI.json";
import WithdrawlQueueABI from "../abis/WithdrawlQueueABI.json";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

export const useLido = () => {
    const { provider, signer, address, setIsStETHApproved, setStETHBalance } = useContext(UserContext);
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
        console.log(value);
        try {
            const tx = await contracts.withdrawlQueue.requestWithdrawals([value], address);
            // console.log("Unstaked Successfully!", tx);
        } catch (err) {
            console.error("Failed to Unstake", err);
        }
    }

    const getBalance = async () => {
        try {
            const balance = await contracts.lido.balanceOf(address);
            setStETHBalance(formatUnits(balance, 18));
        } catch (err) {
            console.err("Failed to get balance", err);
        }
    }

    const approve = async (amount=10) => {
        try {
            const tx = await contracts.lido.approve(address, parseEther(amount));
            console.log("Approved Successfully", tx);
        } catch (err) {
            console.log("Failed to Approve stETH", err);
        }
    }

    const isApproved = async () => {
			try {
				const allowance = await contracts.lido.allowance(address, address);
                setIsStETHApproved(allowance !== '0n')
			} catch (err) {
				console.log("Failed to check approval status", err);
			}
		};

    return {contracts, stake, unstake, getBalance, approve, isApproved};
}

