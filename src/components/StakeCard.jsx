import React from "react";
import styled from "styled-components";
import ProviderSelect from './ProviderSelect';
import AmountInput from "./AmountInput";

const Card = styled.div`
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid black;
    width: 50%;
    margin: 0 auto;
`

const StakeCard = () => {
    return(
        <Card>
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
            <button>Stake</button>

            {/* 5. Optional Info cards */}
        </Card>
    );
}

export default StakeCard;