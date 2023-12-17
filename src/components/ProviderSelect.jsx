import React from 'react';
import styled from 'styled-components';

const Tabs = styled.div`
    display: flex;
    width: full;
`

const Tab = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const ProviderSelect = () => {
    return(
        <Tabs>
            <Tab className="provider-tab">
                Strader
            </Tab>
            <Tab className="provider-tab">
                Lido
            </Tab>
        </Tabs>
    );
}

export default ProviderSelect;