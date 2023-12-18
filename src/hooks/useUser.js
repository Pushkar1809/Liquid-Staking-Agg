import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ethers } from 'ethers';

export const useUser = () => {
	const { setProvider, setSigner, setIsCorrectNetwork, setAddress } = useContext(UserContext);

	const initialise = async () => {
		const localProvider = new ethers.BrowserProvider(window.ethereum);
		await localProvider.send("eth_requestAccounts", []);
		setProvider(localProvider);
		const localSigner = await localProvider.getSigner();
		setSigner(localSigner);
        const userAddress = await localSigner.getAddress();
        setAddress(userAddress)
        const network = await localProvider.getNetwork();
        console.log(network)
        setIsCorrectNetwork(network.name === 'goerli')
	};

	return { initialise };
};
