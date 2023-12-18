import React, {useState} from "react";
import styled from "styled-components";
import ProviderSelect from './ProviderSelect';
import AmountInput from "./AmountInput";
import StakeUnstakeTabs from "./StakeUnstakeTabs";

const Card = styled.div`
    padding: 2rem;
    border-radius: 1rem;
    width: 50%;
    margin: 0 auto;
    background-color: white;
    position: relative;
    margin-top: 5rem;
`

const StakeCard = () => {
    const [activeTask, setActiveTask] = useState('stake')
    return(
        <Card>
            {/* 0. Header to select the job Stake/Unstake */}
            <StakeUnstakeTabs activeTask={activeTask} setActiveTask={setActiveTask}/>

            {/* 1. Liquidity Provider to choose
             Tabs for Strader and Lido */}
            <ProviderSelect/>

            {/* 2. Input for Amount
            Number Input with max button */}
            <AmountInput/>

            {/* 3. Information about the stakes and rewards
            Amount and token user will recieve
            Exchange rate
            Transaction fee */}
            <div className="info">
                <div className="recieve">You will recieve 1 ETHx</div>
                <div className="rate">1 ETH = 1.2 ETHx</div>
                <div className="fee">Transaction fee $23</div>
            </div>

            {/* 4. Stake/Unstake button */}
            {activeTask==='stake' ? <button>Stake</button> : <button>Unstake</button>}
            
            {/* 5. Optional Info cards */}
        </Card>
    );
}

export default StakeCard;