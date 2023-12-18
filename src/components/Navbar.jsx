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
`

const Navbar = () => {
    return (
			<Nav>
				<div className="logo">Staking Assignment</div>
				<ConnectWallet />
			</Nav>
		);
}

export default Navbar;