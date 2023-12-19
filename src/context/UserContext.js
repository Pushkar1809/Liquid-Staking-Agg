import { useState, createContext } from "react";

const UserContext = createContext({
    address: null,
    provider: null,
    signer: null,
    isCorrectNetwork: false,
    nativeBalance: null,
    isETHxApproved: false,
    isStETHApproved: false,
    ETHxBalance: "",
    stETHBalance: "",
    setAddress: () => {},
    setProvider: () => {},
    setSigner: () => {},
    setIsCorrectNetwork: () => {},
    setNativeBalance: () => {},
    setIsETHxApproved: () => {},
    setIsStETHApproved: () => {},
    setETHxBalance: () => {},
    setStETHBalance: () => {},
})

const UserContextProvider = (props) => {
    const [address, setAddress] = useState(null)
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
    const [nativeBalance, setNativeBalance] = useState(null)
    const [ETHxBalance, setETHxBalance] = useState("");
    const [stETHBalance, setStETHBalance] = useState("");
    const [isETHxApproved, setIsETHxApproved] = useState(false);
    const [isStETHApproved, setIsStETHApproved] = useState(false);

    return (
        <UserContext.Provider value={{
            address,
            provider,
            signer,
            isCorrectNetwork,
            nativeBalance,
            ETHxBalance,
            stETHBalance,
            isETHxApproved,
            isStETHApproved,
            setAddress,
            setProvider,
            setSigner,
            setIsCorrectNetwork,
            setNativeBalance,
            setETHxBalance,
            setStETHBalance,
            setIsETHxApproved,
            setIsStETHApproved,
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, UserContextProvider as default};