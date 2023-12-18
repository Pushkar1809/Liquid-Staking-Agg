import React, {useContext, useState} from "react";
import { styled } from 'styled-components';
import "../styles/AmountInput.css"
import { UserContext } from "../context/UserContext";

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
`

const MaxWrapper = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 0.25rem;
`

const AmountInput = ({activeTask, setActiveTask, protocol, amount, setAmount}) => {
    const {nativeBalance} = useContext(UserContext);
    return (
			<InputWrapper>
				<label style={{ opacity: 0.5 }}>
					Enter {activeTask === "stake" ? "ETH" : protocol==='stader'? 'ETHx' : 'stETH'} Amount
				</label>
				<Input>
					<input
						placeholder="0.0"
						type="number"
						className="amount-input"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
					<MaxWrapper>
						<button
							onClick={() => {
								setAmount(nativeBalance);
							}}
							className="max-btn">
							Max
						</button>
						{nativeBalance && (
							<span style={{ fontSize: "0.65rem", fontWeight: 400 }}>
								Balance: {nativeBalance}ETH
							</span>
						)}
					</MaxWrapper>
				</Input>
			</InputWrapper>
		);
}

export default AmountInput;