import {Contract, formatUnits, parseEther, ZeroAddress} from 'ethers';
import {useContext, useEffect, useState} from 'react';

import LidoABI from "../abis/LidoABI.json";
import WithdrawlQueueABI from "../abis/WithdrawlQueueABI.json";
import {UserContext} from '../context/UserContext';

export const useLido = () => {
  const {signer, address, setIsStETHApproved, setStETHBalance} =
      useContext(UserContext);
  const [contracts, setContracts] =
      useState({lido : null, withdrawlQueue : null})

  const lidoAddress = "0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F";
  const withdrawlQueueAddress = "0xCF117961421cA9e546cD7f50bC73abCdB3039533";

  useEffect(() => {
    const lido = new Contract(lidoAddress, LidoABI, signer);
    const withdrawlQueue = new Contract(
        withdrawlQueueAddress,
        WithdrawlQueueABI,
        signer,
    );
    setContracts({lido, withdrawlQueue});
  }, [ signer ]);

  const stake =
      async (value) => {
    try {
      await contracts.lido.submit(ZeroAddress, {value});
    } catch (err) {
      console.error("Failed to Stake", err);
    }
  }

  const unstake =
      async (value) => {
    console.log(value);
    try {
      await contracts.withdrawlQueue.requestWithdrawals([ value ], address);
    } catch (err) {
      console.error("Failed to Unstake", err);
    }
  }

  const getBalance =
      async () => {
    try {
      const balance = await contracts.lido.balanceOf(address);
      setStETHBalance(formatUnits(balance, 18));
    } catch (err) {
      console.error("Failed to get balance", err);
    }
  }

  const approve =
      async (amount = 10) => {
    try {
      await contracts.lido.approve(withdrawlQueueAddress, parseEther(amount));
    } catch (err) {
      console.log("Failed to Approve stETH", err);
    }
  }

  const isApproved = async () => {
    try {
      const allowance = await contracts.lido.allowance(
          address,
          withdrawlQueueAddress,
      );
      setIsStETHApproved(allowance > parseEther("0"))
    } catch (err) {
      console.log("Failed to check approval status", err);
    }
  };

  const getExchangeRate =
      async () => {
    try {
      const rate = await contracts.lido.getPooledEthByShares(1);
      return rate;
    } catch (err) {
      console.error("Failed to get exhange rate", err);
    }
  }

  return {
    contracts,
    stake,
    unstake,
    getBalance,
    approve,
    isApproved,
    getExchangeRate
  };
}
