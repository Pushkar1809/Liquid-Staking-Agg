import React from "react";
import ConnectWallet from "./ConnectWallet";
import { styled } from 'styled-components';
import '../styles/Navbar.css'

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 5rem;
`

const Navbar = () => {
    return (
			<Nav>
				<div className="left">
					<div className="logo">Staking Assignment</div>
					<div className="links">
						<a href="/stake">Stake</a>
						<a href="/unstake">Unstake</a>
					</div>
				</div>

				<ConnectWallet />
			</Nav>
		);
}

export default Navbar;