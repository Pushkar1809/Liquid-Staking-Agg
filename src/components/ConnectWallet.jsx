import React, {useContext} from "react";
import { UserContext } from "../context/UserContext";
import { useUser } from "../hooks/useUser";
import { styled } from 'styled-components';
import { IoPerson } from "react-icons/io5";
import { FaUnlink } from "react-icons/fa";
import { WinDimContext } from "../context/WinDimContext";

const AccountTag = styled.div`
	max-width: 20ch;
	overflow: hidden;
	text-overflow: ellipsis;
	border: 1px solid var(--color-accent);
	color: var(--color-accent);
	border-radius: 0.25rem;
	padding: 0.75rem 1.5rem;
	font-weight: 700;

	@media only screen and (max-width: 768px) {
		padding: 0.5rem 0.75rem;
		padding-top: 0.65rem;
	}
`;

const Button = styled.button`
	color: white;
	font-size: 1rem;
	background-color: var(--color-accent);
	border-radius: 0.25rem;
	padding: 0.75rem 1.5rem;
	font-weight: 700;
	border: none;

	@media only screen and (max-width: 768px) {
		padding: 0.5rem 0.75rem;
        padding-top: 0.65rem;
	}
`;

const ConnectWallet = () => {
    const { address, isCorrectNetwork } = useContext(UserContext);
    const { width } = useContext(WinDimContext);
    const { initialise } = useUser();

    return (
			<div>
				{!!address ? (
					<div style={{ display: "flex", alignItems: "center" }}>
						{!isCorrectNetwork && (
							<Button style={{ background: "red", marginRight: "0.75rem" }}>
								{width > 768 ? "Switch to Goerli" : <FaUnlink />}
							</Button>
						)}
						<AccountTag>{width > 768 ? address : <IoPerson />}</AccountTag>
					</div>
				) : (
					<Button onClick={initialise}>Connect Wallet</Button>
				)}
			</div>
		);
}

export default ConnectWallet;