import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useUser } from "../hooks/useUser";
import { styled } from "styled-components";
import { IoPerson } from "react-icons/io5";
import { FaUnlink } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { WinDimContext } from "../context/WinDimContext";

const AccountTag = styled.div`
  max-width: 20ch;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
  font-weight: 700;

  @media only screen and (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    padding-top: 0.65rem;
  }
`;

const Button = styled.button`
  color: white;
  font-size: 1rem;
  background-color: var(--color-accent);
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  border: none;

  @media only screen and (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    padding-top: 0.65rem;
  }
`;

const ModalCard = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid var(--color-accent);
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.15);
  position: absolute;
  right: 0;
  bottom: -3.5rem;
`;

const ConnectWallet = () => {
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isNetworkErrorVisible, setIsNetworkErrorVisible] = useState(false);
  const { address, isCorrectNetwork } = useContext(UserContext);
  const { width } = useContext(WinDimContext);
  const { initialise } = useUser();

  return (
    <div>
      {!!address ? (
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          {!isCorrectNetwork && (
            <>
              <Button
                onClick={() => {
                  setIsNetworkErrorVisible(!isNetworkErrorVisible);
                  if (isAddressVisible) {
                    setIsAddressVisible(false);
                  }
                }}
                style={{ background: "red", marginRight: "0.75rem" }}
              >
                {width > 768 ? (
                  "Switch to Holesky"
                ) : isNetworkErrorVisible ? (
                  <RxCross2 />
                ) : (
                  <FaUnlink />
                )}
              </Button>
              {width <= 768 && isNetworkErrorVisible && (
                <ModalCard
                  style={{ color: "red", borderColor: "red", minWidth: "17ch" }}
                >
                  Switch to Holesky
                </ModalCard>
              )}
            </>
          )}
          <AccountTag
            onClick={() => {
              setIsAddressVisible(!isAddressVisible);
              if (isNetworkErrorVisible) {
                setIsNetworkErrorVisible(false);
              }
            }}
          >
            {width > 768 ? (
              address
            ) : isAddressVisible ? (
              <RxCross2 />
            ) : (
              <IoPerson />
            )}
          </AccountTag>
          {width <= 768 && isAddressVisible && <ModalCard>{address}</ModalCard>}
        </div>
      ) : (
        <Button onClick={initialise}>Connect Wallet</Button>
      )}
    </div>
  );
};

export default ConnectWallet;
