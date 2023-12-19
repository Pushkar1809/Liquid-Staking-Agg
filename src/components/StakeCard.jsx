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
import { ethers } from 'ethers';

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
	const [exchangeRate, setExchangeRate] = useState(null);
	const {initialise} = useUser();
	const {
		contracts: staderContracts,
		stake: staderStake,
		unstake: staderUnstake,
		approve: approveETHx,
		getExchangeRate: getStaderExchangeRate,
		getBalance: getETHxBalance,
	} = useStader();

	const {
		contracts: lidoContracts,
		stake: lidoStake,
		unstake: lidoUnstake,
		approve: approveStETH,
		getBalance: getStETHBalance,
		getExchangeRate: getLidoExchangeRate,
	} = useLido();
    const [activeTask, setActiveTask] = useState('stake');
    const [protocol, setProtocol] = useState('stader');
	const [amount, setAmount] = useState("");
	const {
		address,
		provider,
		nativeBalance,
		ETHxBalance,
		stETHBalance,
		isETHxApproved,
		isStETHApproved,
		setIsETHxApproved,
		setIsStETHApproved,
		setNativeBalance,
	} = useContext(UserContext);

	useEffect(() => {
		const getRate = async () => {
			let rate;
			if (protocol === "stader") {
				rate = await getStaderExchangeRate();
			} else {
				rate = await getLidoExchangeRate();
			}
			setExchangeRate(1/Number(rate));
		}
		if(provider) {
			getRate();
		}
	}, [provider, protocol, getStaderExchangeRate])

	const handleStake = async () => {
		if (protocol === "stader") {
			staderStake(parseEther(`${amount}`));
			setAlert({
				content: "Staking in progress...",
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
			getETHxBalance();
		} else {
			lidoStake(parseEther(`${amount}`));
			setAlert({
				content: "Staking in progress...",
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
			getStETHBalance();
		}
		const nativeBalanceWei = await provider.getBalance(address);
		const nativeBalance = ethers.formatEther(nativeBalanceWei);
		setNativeBalance(nativeBalance);
		setAmount("")
	}

	const handleETHxApprove = () => {
		approveETHx(ETHxBalance);
		staderContracts.ETHx.on("Approval", (from, to, amount) => {
			setIsETHxApproved(true);
			setAlert({
				title: "ETHx Approved",
				content: `${handleDecimals(formatUnits(amount, 18))}ETHx approved`,
				isOpen: true,
				level: "success",
			});
		})
	}

	const handleETHxUnstake = () => {
		staderUnstake(parseEther(`${amount}`));
		staderContracts.userWithdrawlManager.on(
			"WithdrawRequestReceived",
			(from, to, shares, amount) => {
				setAlert({
					title: "ETHx Unstaked Successfully",
					content: `${handleDecimals(formatUnits(amount, 18))}ETHx unstaked on request from ${from}`,
					isOpen: true,
					level: "success",
				});
			},
		);
		getETHxBalance();
		setAmount("");
	}

	const handleStETHApprove = () => {
		approveStETH(stETHBalance);
		lidoContracts.lido.on("Approval", (from, to, amount,x) => {
			console.log(from, to, amount, x)
			setIsStETHApproved(true);
			setAlert({
				title: "stETH Approved",
				content: `${handleDecimals(
					formatUnits(amount, 18),
				)}stETH approved`,
				isOpen: true,
				level: "success",
			});
		});
	}

	const handleStETHUnstake = () => {
		lidoUnstake(parseEther(`${amount}`));
		lidoContracts.withdrawlQueue.on("WithdrawalRequested", (id, requestor, owner, amount, shares) => {
			setAlert({
				title: "stETH Unstaked Successfully!",
				content: `${handleDecimals(formatUnits(amount, 18))}stETH unstake on request from ${requestor}`,
				isOpen: true,
				level: "success",
			});
		});
		getStETHBalance();
		setAmount("");
	}

	const handleApproval = (approveFunction, approvalMessage) => {
		setAlert({
			content: approvalMessage,
			isOpen: true,
			level: "warning",
		});
		approveFunction();
	};

	const handleUnstake = (unstakeFunction, unstakeMessage) => {
		unstakeFunction(parseEther(`${amount}`));
		setAlert({
			content: unstakeMessage,
			isOpen: true,
			level: "warning",
		});
		setAmount("");
	};

	const renderApproveOrUnstakeBtn = () => {
		const isApproved = protocol === "stader" ? isETHxApproved : isStETHApproved;
		const approveFunction =
			protocol === "stader" ? handleETHxApprove : handleStETHApprove;
		const unstakeFunction =
			protocol === "stader" ? handleETHxUnstake : handleStETHUnstake;

		if (isApproved) {
			return (
				<ActionBtn
					disabled={!amount}
					onClick={() =>
						handleUnstake(unstakeFunction, "Unstaking in progress...")
					}>
					Unstake
				</ActionBtn>
			);
		} else {
			return (
				<ActionBtn
					onClick={() =>
						handleApproval(
							approveFunction,
							"Approval request being processed...",
							`${protocol.toUpperCase()} Approved`,
						)
					}>
					Approve
				</ActionBtn>
			);
		}
	};

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
						{provider && (
							<MaxWrapper>
								<MaxBtn
									onClick={() => {
										if (activeTask === "stake") {
											setAmount(nativeBalance);
										} else {
											setAmount(
												protocol === "stader" ? ETHxBalance : stETHBalance,
											);
										}
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
										Balance:{" "}
										<Strong>
											{handleDecimals(
												activeTask === "stake"
													? nativeBalance
													: protocol === "stader"
													? ETHxBalance
													: stETHBalance,
											)}
										</Strong>
										{activeTask === "stake"
											? "ETH"
											: protocol === "stader"
											? "ETHx"
											: "stETH"}
									</span>
								)}
							</MaxWrapper>
						)}
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
								<Strong>
									{!amount ? 0 : activeTask==='stake' ? handleDecimals(amount * exchangeRate) : handleDecimals(amount / exchangeRate)}
								</Strong>
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
					<ActionBtn disabled={!amount} onClick={handleStake}>
						Stake
					</ActionBtn>
				) : (renderApproveOrUnstakeBtn())}

				{/* 5. Optional Info cards */}
			</Card>
		);
}

export default StakeCard;