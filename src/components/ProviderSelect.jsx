import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	@media only screen and (max-width: 548px) {
		flex-direction: column;
	}
`;

const SelectElement = styled.div`
    width: 50%;
    padding: 1rem 2rem;
    border: 1px solid var(--color-accent);
    border-radius: 0.5rem;
    cursor: pointer;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 548px) {
        width: 100%;
    }
`

const ProviderSelect = ({protocol, setProtocol}) => {
    const activeTabStyle={background: "var(--color-accent)", color: "white", fontWeight: 700}
    return (
			<SelectContainer>
				<SelectElement
					style={protocol==="stader"?activeTabStyle:{}}
					onClick={() => setProtocol("stader")}>
					stader
				</SelectElement>
				<SelectElement
					style={protocol==="lido"?activeTabStyle:{}}
					onClick={() => setProtocol("lido")}>
					Lido
				</SelectElement>
			</SelectContainer>
		);
}

export default ProviderSelect;