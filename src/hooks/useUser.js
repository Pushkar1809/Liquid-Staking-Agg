import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ethers } from 'ethers';

export const useUser = () => {
	const { setProvider, setSigner, setIsCorrectNetwork, setAddress, setNativeBalance } = useContext(UserContext);

	const initialise = async () => {
		const localProvider = new ethers.BrowserProvider(window.ethereum);
		await localProvider.send("eth_requestAccounts", []);
		setProvider(localProvider);
		const localSigner = await localProvider.getSigner();
		setSigner(localSigner);
        const userAddress = await localSigner.getAddress();
        setAddress(userAddress)
        const network = await localProvider.getNetwork();
        setIsCorrectNetwork(Number(network.chainId) === 17000);
		const nativeBalanceWei = await localProvider.getBalance(userAddress);
		const nativeBalance = ethers.formatEther(nativeBalanceWei);
		setNativeBalance(nativeBalance);
	};

	return { initialise };
};
