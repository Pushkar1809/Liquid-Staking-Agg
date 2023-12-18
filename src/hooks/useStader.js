import {Contract, ZeroAddress} from 'ethers'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import StaderPoolManagerABI from "../abis/StaderPoolManagerABI.json";
import ETHxABI from "../abis/ETHxABI.json";
import userWithdrawlManagerABI from "../abis/UserWithdrawlManagerABI.json"

export const useStader = () => {
    const {provider, signer, address} = useContext(UserContext);
    const staderPoolManagerAdress =
			"0xd0e400Ec6Ed9C803A9D9D3a602494393E806F823";
    const ETHxAddress = "0x3338eCd3ab3d3503c55c931d759fA6d78d287236";
    const userWithdrawlManagerAddress =
			"0x1048Eca024cB2Ba5eA720Ac057D804E95a809Fc8";

    
    const ETHx = new Contract(ETHxAddress, ETHxABI, signer);
    const userWithdrawlManager = new Contract(userWithdrawlManagerAddress, userWithdrawlManagerABI, signer);

    const stake = async (value) => {
        const staderPoolManager = new Contract(
					staderPoolManagerAdress,
					StaderPoolManagerABI,
					signer,
				);
        const ETHxAmount = await staderPoolManager.deposit(address, 1, {value});
        return ETHxAmount;
    }

    const unstake = () => {

    }

    const approve = () => {

    } 

    return {stake, unstake, approve};
}