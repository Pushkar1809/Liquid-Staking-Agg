import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components";
import ProviderSelect from './ProviderSelect';
import StakeUnstakeTabs from "./StakeUnstakeTabs";
import { UserContext } from "../context/UserContext";
import { useUser } from '../hooks/useUser';
import { useStader } from '../hooks/useStader';
import { useLido } from "../hooks/useLido";
import { parseEther, formatUnits } from 'ethers';
import { handleDecimals } from '../utils/handleDecimals';

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
	&:disabled, &[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}
`

const InfoElement = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
	font-size: 0.75rem;
	margin: 0.2rem 0;
`

const InputWrapper = styled.div`
	margin: 1rem 0;
`;

const Input = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: var(--color-gray);
	padding: 1rem;
	border-radius: 1rem;
	margin-top: 0.5rem;
`;

const MaxBtn = styled.button`
	background-color: var(--color-accent);
	border: none;
	color: white;
	padding: 0.5rem;
	border-radius: 0.5rem;
	font-size: 0.75rem;
`;

const InputElement = styled.input`
	border: none;
	padding: 0.5rem 1rem;
	font-size: 2rem;
	font-weight: 600;
	width: 90%;
	background-color: transparent;
	&:focus {
		outline: none;
	}
`;

const MaxWrapper = styled.div`
	width: 20%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
	gap: 0.5rem;
`;

const Strong = styled.span`
	font-weight: 600;
`

const StakeCard = ({setAlert}) => {
	const [exchangeRate, setExchangeRate] = useState(null)
	const {initialise} = useUser();
	const {
		contracts: staderContracts,
		stake: staderStake,
		unstake: staderUnstake,
		approve: staderApprove,
		isApproved: isETHxApproved,
		getExchangeRate: getStaderExchangeRate,
	} = useStader();

	const {
		contracts: lidoContracts,
		stake: lidoStake,
		unstake: lidoUnstake,
		approve: lidoApprove,
		isAprroved: isStETHApproved,
	} = useLido();
    const [activeTask, setActiveTask] = useState('stake');
    const [protocol, setProtocol] = useState('stader');
	const [amount, setAmount] = useState("");
	const {provider, nativeBalance} = useContext(UserContext);

	useEffect(() => {
		const getRate = async () => {
			let rate;
			if (protocol === "stader") {
				rate = await getStaderExchangeRate();
			}
			setExchangeRate(rate);
		}
		if(provider) {
			getRate();
		}
	}, [provider, protocol, getStaderExchangeRate])

	const renderApproveOrUnstake = () => {
		const unstakeFunc =
			protocol === "stader" ? staderUnstake : lidoUnstake;
		const approveFunc = protocol === "stader"  ? staderApprove : lidoApprove;
		const isApproved = protocol === "stader" ? isETHxApproved() : isStETHApproved();
		console.log(isETHxApproved())

		return (
			<ActionBtn
				onClick={() =>
					isApproved ? unstakeFunc(parseEther(amount)) : approveFunc()
				}>
				{isApproved ? "Unstake" : "Approve"}
			</ActionBtn>
		);
	};

	const handleStakeClick = () => {
		if (protocol === "stader") {
			staderStake(parseEther(`${amount}`));
			setAlert({
				content: "Staking in process",
				isOpen: true,
				level: "warning",
			});
			staderContracts.staderPoolManager.on(
				"Deposited",
				(from, to, eth, ethx) => {
					setAlert({
						title: "Staking Successful",
						content: `Staked ${formatUnits(eth, 18)}ETH and got ${formatUnits(
							ethx,
							18,
						)}ETHx on Stader`,
						isOpen: true,
						level: "success",
					});
				},
			);
		} else {
			lidoStake(parseEther(`${amount}`));
			setAlert({
				content: "Staking in process",
				isOpen: true,
				level: "warning",
			});
			lidoContracts.lido.on("Submitted", (address, eth) => {
				setAlert({
					title: "Staking Successful",
					content: `Staked ${formatUnits(eth, 18)}ETH in Lido`,
					isOpen: true,
					level: "success",
				});
			});
		}
		setAmount("")
	}

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
				<InputWrapper>
					<label style={{ opacity: 0.5 }}>
						Enter{" "}
						{activeTask === "stake"
							? "ETH"
							: protocol === "stader"
							? "ETHx"
							: "stETH"}{" "}
						Amount
					</label>
					<Input>
						<InputElement
							placeholder="0.0"
							type="number"
							className="amount-input"
							value={amount}
							min="0"
							onChange={(e) => setAmount(e.target.value)}
						/>
						{provider && <MaxWrapper>
							<MaxBtn
								onClick={() => {
									setAmount(nativeBalance);
								}}
								className="max-btn">
								Max
							</MaxBtn>
							{nativeBalance && (
								<span
									style={{
										fontSize: "0.65rem",
										fontWeight: 400,
										textAlign: "right",
									}}>
									Balance: <Strong>{handleDecimals(nativeBalance)}</Strong>ETH
								</span>
							)}
						</MaxWrapper>}
					</Input>
				</InputWrapper>

				{/* 3. Information about the stakes and rewards
            Amount and token user will recieve
            Exchange rate
            Transaction fee */}
				{exchangeRate && (
					<div className="info">
						<InfoElement>
							<label>You will recieve</label>
							<span>
								<Strong>{amount ? handleDecimals(amount / exchangeRate): 0}</Strong>
								{protocol === "stader" ? "ETHx" : "stETH"}
							</span>
						</InfoElement>
						<InfoElement>
							<label>Exchange Rate</label>
							<span>
								<Strong>1</Strong>ETH ={" "}
								<Strong>{handleDecimals(exchangeRate)}</Strong>
								{protocol === "stader" ? "ETHx" : "stETH"}
							</span>
						</InfoElement>
					</div>
				)}

				{/* 4. Stake/Unstake button */}
				{!provider ? (
					<ActionBtn onClick={initialise}>Connect Wallet</ActionBtn>
				) : activeTask === "stake" ? (
					<ActionBtn disabled={!amount} onClick={handleStakeClick}>
						Stake
					</ActionBtn>
				) : (
					renderApproveOrUnstake()
				)}

				{/* 5. Optional Info cards */}
			</Card>
		);
}

export default StakeCard;