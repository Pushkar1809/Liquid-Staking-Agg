import {Contract, parseEther, formatUnits, ZeroAddress} from 'ethers';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import StaderPoolManagerABI from "../abis/StaderPoolManagerABI.json";
import ETHxABI from "../abis/ETHxABI.json";
import userWithdrawlManagerABI from "../abis/UserWithdrawlManagerABI.json"

export const useStader = () => {
    const { signer, address} = useContext(UserContext);
    const [contracts, setContracts] = useState({
        staderPoolManager: null,
        ETHx: null,
        userWithdrawlManager: null
    });

    const staderPoolManagerAdress =
			"0xd0e400Ec6Ed9C803A9D9D3a602494393E806F823";
    const ETHxAddress = "0x3338eCd3ab3d3503c55c931d759fA6d78d287236";
    const userWithdrawlManagerAddress =
			"0x1048Eca024cB2Ba5eA720Ac057D804E95a809Fc8";

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
        setContracts({staderPoolManager, ETHx, userWithdrawlManager})
    }, [signer])

    const stake = async (value) => {
        try {
            const ETHxAmount = await contracts.staderPoolManager.deposit(address, 1, {value});
            console.log("Staked Successfully", ETHxAmount);
        } catch (err) {
            console.error("Failed to stake", err)
        }
    }

    const unstake = async (value) => {
        try {
            const tx = await contracts.userWithdrawlManager.requestWithdraw(value, address, 1);
            // console.log("Unstaking Successful!", tx);
        } catch (err) {
            console.error("Unstaking Failed", err);
        }
        
    }

    const approve = async () => {
        try {
            const tx = await contracts.ETHx.approve(address, parseEther("1000000"));
            // console.log("Token approved successfully", tx);
        } catch (err) {
            console.error("Failed to approve", err);
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

    const isApproved = async () => {
        try {
            const allowance = await contracts.ETHx.allowance(address, ZeroAddress);
            return allowance > 0;
        } catch (err) {
            console.error("Failed to check allowance", err);
        }
    };

    return {contracts, stake, unstake, approve, isApproved, getExchangeRate};
}