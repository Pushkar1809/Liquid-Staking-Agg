import { useState, createContext } from "react";

const UserContext = createContext({
    address: null,
    provider: null,
    signer: null,
    isCorrectNetwork: false,
    nativeBalance: null,
    setAddress: () => {},
    setProvider: () => {},
    setSigner: () => {},
    setIsCorrectNetwork: () => {},
    setNativeBalance: () => {},
})

const UserContextProvider = (props) => {
    const [address, setAddress] = useState(null)
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
    const [nativeBalance, setNativeBalance] = useState(null)

    return (
        <UserContext.Provider value={{
            address,
            provider,
            signer,
            isCorrectNetwork,
            nativeBalance,
            setAddress,
            setProvider,
            setSigner,
            setIsCorrectNetwork,
            setNativeBalance,
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, UserContextProvider as default};