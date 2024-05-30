import {Contract, parseEther, formatUnits} from 'ethers';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import StaderPoolManagerABI from "../abis/StaderPoolManagerABI.json";
import ETHxABI from "../abis/ETHxABI.json";
import userWithdrawlManagerABI from "../abis/UserWithdrawlManagerABI.json"

export const useStader = () => {
    const { signer, address, setIsETHxApproved, setETHxBalance } = useContext(UserContext);
    const [contracts, setContracts] = useState({
        staderPoolManager: null,
        ETHx: null,
        userWithdrawlManager: null
    });

    const staderPoolManagerAdress =
			"0x7F09ceb3874F5E35Cd2135F56fd4329b88c5d119";
    const ETHxAddress = "0xB4F5fc289a778B80392b86fa70A7111E5bE0F859";
    const userWithdrawlManagerAddress =
			"0x3F6F1C1081744c18Bd67DD518F363B9d4c76E1d2";

    useEffect(() => {
        const staderPoolManager = new Contract(
            staderPoolManagerAdress,
            StaderPoolManagerABI,
            signer,
        );
        const ETHx = new Contract(ETHxAddress, ETHxABI, signer);
        const userWithdrawlManager = new Contract(
            userWithdrawlManagerAddress,
            userWithdrawlManagerABI,
            signer,
        );
        setContracts({ staderPoolManager, ETHx, userWithdrawlManager });
    }, [signer]);

    const stake = async (value) => {
        try {
            await contracts.staderPoolManager.deposit(address, 1, {value});
        } catch (err) {
            console.error("Failed to stake", err)
        }
    }

    const unstake = async (value) => {
        console.log(value)
        try {
            await contracts.userWithdrawlManager.requestWithdraw(value, address);
        } catch (err) {
            console.error("Unstaking Failed", err);
        }
        
    }

    const getExchangeRate = async () => {
        try {
            const rate = await contracts.staderPoolManager.getExchangeRate();
            return formatUnits(rate, 18);
        } catch (err) {
            console.error("Getting Exchange Rate unscessesful", err);
        }
    }

    const getBalance = async () => {
        try {
            const balance = await contracts.ETHx.balanceOf(address);
            setETHxBalance(formatUnits(balance, 18));
        } catch (err) {
            console.error("Failed to get balance", err);
        }
    };

    const approve = async (amount=10) => {
        try {
            await contracts.ETHx.approve(userWithdrawlManagerAddress, parseEther(amount));
        } catch (err) {
            console.error("Failed to Approve ETHx", err)
        }
    }

    const isApproved = async () => {
        try {
            const allowance = await contracts.ETHx.allowance(
							address,
							userWithdrawlManagerAddress,
						);
            setIsETHxApproved(allowance > parseEther("0"));
        } catch (err) {
            console.error("Failed to check approval status", err);
        }
    }

    return {contracts, stake, unstake, getExchangeRate, getBalance, approve, isApproved};
}