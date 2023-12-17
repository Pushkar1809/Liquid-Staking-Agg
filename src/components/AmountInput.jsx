import React from "react";
import { styled } from 'styled-components';

const Input = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const AmountInput = () => {
    return(
        <Input>
            <input placeholder="0.0" type="number" />
            <button>Max</button>
        </Input>
    );
}

export default AmountInput;