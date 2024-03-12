import React from "react";
import ConnectWallet from "./ConnectWallet";
import { styled } from 'styled-components';
import '../styles/Navbar.css'

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    width: 100%;
    gap: 4rem;
`

const Navbar = () => {
    return (
			<Nav>
				<div className="logo">Liquid Staking (Testnet)</div>
				<ConnectWallet />
			</Nav>
		);
}

export default Navbar;