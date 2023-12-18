import React from 'react';
import styled from 'styled-components';

const Tabs = styled.div`
	position: absolute;
    top: -2.75rem;
    left: 0;
    display: flex;
    align-items: center;
`;

const Tab = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
    padding: 1rem 3rem;
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: white;
`;

const StakeUnstakeTabs = ({activeTask, setActiveTask}) => {
    return (
			<Tabs>
				<Tab onClick={()=> setActiveTask('stake')} style={{ opacity: activeTask === "stake" ? 1 : 0.5 }}>Stake</Tab>
				<Tab onClick={() => setActiveTask('unstake')} style={{ opacity: activeTask === "unstake" ? 1 : 0.5 }}>
					Unstake
				</Tab>
			</Tabs>
		);
};

export default StakeUnstakeTabs;