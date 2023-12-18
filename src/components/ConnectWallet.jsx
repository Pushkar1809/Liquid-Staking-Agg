import React, {useContext} from "react";
import { UserContext } from "../context/UserContext";
import { useUser } from "../hooks/useUser";

const ConnectWallet = () => {
    const { address, isCorrectNetwork } = useContext(UserContext);
    const { initialise } = useUser();

    return (
			<div>
                {/* Add wrong network button */}
				{!!address ? (
					<div style={{background: !isCorrectNetwork && 'red'}} className="connect-wallet">{address}</div>
				) : (
					<button onClick={initialise} className="connect-wallet">Connect Wallet</button>
				)}
			</div>
		);
}

export default ConnectWallet;