import React, { useContext } from 'react';
import styled from 'styled-components';
import { useLido } from '../hooks/useLido';
import { useStader } from '../hooks/useStader';
import { UserContext } from '../context/UserContext';

const Tabs = styled.div`
	position: absolute;
    top: -2.25rem;
    left: 0;
    display: flex;
    align-items: center;
`;

const Tab = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
    padding: 1.5rem 3rem;
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: white;
	padding-top: 0.75rem;
`;

const StakeUnstakeTabs = ({activeTask, setActiveTask}) => {
	const {getBalance: getStETHBalance, isApproved: isStETHApproved} = useLido();
	const {getBalance: getETHxBalance, isApproved: isETHxApproved} = useStader();
	const {provider} = useContext(UserContext);


	const handleUnstakeClick = () => {
		setActiveTask('unstake')
		if (provider) {
			getStETHBalance();
			getETHxBalance();
			isStETHApproved();
			isETHxApproved();
		}
	}

    return (
			<Tabs>
				<Tab onClick={() => setActiveTask('stake')} style={{ opacity: activeTask === "stake" ? 1 : 0.5 }}>Stake</Tab>
				<Tab onClick={handleUnstakeClick} style={{ opacity: activeTask === "unstake" ? 1 : 0.5 }}>
					Unstake
				</Tab>
			</Tabs>
		);
};

export default StakeUnstakeTabs;