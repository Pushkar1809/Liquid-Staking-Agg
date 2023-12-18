import React, {useState, useContext} from "react";
import styled from "styled-components";
import ProviderSelect from './ProviderSelect';
import AmountInput from "./AmountInput";
import StakeUnstakeTabs from "./StakeUnstakeTabs";
import { UserContext } from "../context/UserContext";
import { useUser } from '../hooks/useUser';
import { useStader } from '../hooks/useStader';
import { useLido } from "../hooks/useLido";
import {parseEther} from 'ethers';

const Card = styled.div`
	min-width: 50ch;
	padding: 2rem;
	border-radius: 1rem;
	width: 50%;
	margin: 0 auto;
	background-color: white;
	position: relative;
	margin-top: 5rem;

	@media only screen and (max-width: 548px) {
		min-width: 0;
		width: 90%;
	}
`;

const ActionBtn = styled.button`
    width: 100%;
    padding: 1rem;
    border: none;
    background-color: var(--color-accent);
    color: white;
    font-weight: 700;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    margin-top: 1rem;
`

const InfoElement = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
	font-size: 0.75rem;
	margin: 0.2rem 0;
`

const StakeCard = () => {
	const {initialise} = useUser();
	const {stake: staderStake} = useStader();
	const {stake: lidoStake} = useLido();
    const [activeTask, setActiveTask] = useState('stake');
    const [protocol, setProtocol] = useState('stader');
	const [amount, setAmount] = useState();
	const {provider} = useContext(UserContext);
    return (
			<Card>
				{/* 0. Header to select the job Stake/Unstake */}
				<StakeUnstakeTabs
					activeTask={activeTask}
					setActiveTask={setActiveTask}
				/>

				{/* 1. Liquidity Provider to choose
             Tabs for stader and Lido */}
				<ProviderSelect protocol={protocol} setProtocol={setProtocol} />

				{/* 2. Input for Amount
            Number Input with max button */}
				<AmountInput
					activeTask={activeTask}
					setActiveTask={setActiveTask}
					protocol={protocol}
					amount={amount}
					setAmount={setAmount}
				/>

				{/* 3. Information about the stakes and rewards
            Amount and token user will recieve
            Exchange rate
            Transaction fee */}
				<div className="info">
					<InfoElement>
						<label>You will recieve</label>
						<span>1 {protocol === "stader" ? "ETHx" : "stETH"}</span>
					</InfoElement>
					<InfoElement>
						<label>Exchange Rate</label>
						<span>1 ETH = 1.2 {protocol === "stader" ? "ETHx" : "stETH"}</span>
					</InfoElement>
					<InfoElement>
						<label>Transaction fee</label>
						<span>$23</span>
					</InfoElement>
				</div>

				{/* 4. Stake/Unstake button */}
				{!provider ? (
					<ActionBtn onClick={initialise}>Connect Wallet</ActionBtn>
				) : activeTask === "stake" ? (
					<ActionBtn
						onClick={() => {
							if (protocol === "stader") {
								staderStake(parseEther(amount));
							} else {
								lidoStake(parseEther(amount));
							}
						}}>
						Stake
					</ActionBtn>
				) : (
					<ActionBtn>Unstake</ActionBtn>
				)}

				{/* 5. Optional Info cards */}
			</Card>
		);
}

export default StakeCard;