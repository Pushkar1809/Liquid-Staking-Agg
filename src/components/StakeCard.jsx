import React, {useState} from "react";
import styled from "styled-components";
import ProviderSelect from './ProviderSelect';
import AmountInput from "./AmountInput";
import StakeUnstakeTabs from "./StakeUnstakeTabs";

const Card = styled.div`
    min-width: 50ch;
    padding: 2rem;
    border-radius: 1rem;
    width: 50%;
    margin: 0 auto;
    background-color: white;
    position: relative;
    margin-top: 5rem;
`

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
`

const StakeCard = () => {
    const [activeTask, setActiveTask] = useState('stake');
    const [protocol, setProtocol] = useState('strader');
    return (
			<Card>
				{/* 0. Header to select the job Stake/Unstake */}
				<StakeUnstakeTabs
					activeTask={activeTask}
					setActiveTask={setActiveTask}
				/>

				{/* 1. Liquidity Provider to choose
             Tabs for Strader and Lido */}
				<ProviderSelect protocol={protocol} setProtocol={setProtocol} />

				{/* 2. Input for Amount
            Number Input with max button */}
				<AmountInput activeTask={activeTask} setActiveTask={setActiveTask}/>

				{/* 3. Information about the stakes and rewards
            Amount and token user will recieve
            Exchange rate
            Transaction fee */}
				<div className="info">
					<InfoElement>
						<label>You will recieve</label>
						<span>1 ETHx</span>
					</InfoElement>
					<InfoElement>
						<label>Exchange Rate</label>
						<span>1 ETH = 1.2 ETHx</span>
					</InfoElement>
					<InfoElement>
						<label>Transaction fee</label>
						<span>$23</span>
					</InfoElement>
				</div>

				{/* 4. Stake/Unstake button */}
				{activeTask === "stake" ? (
					<ActionBtn>Stake</ActionBtn>
				) : (
					<ActionBtn>Unstake</ActionBtn>
				)}

				{/* 5. Optional Info cards */}
			</Card>
		);
}

export default StakeCard;