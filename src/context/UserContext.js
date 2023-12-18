import { useState, createContext } from "react";

const UserContext = createContext({
    address: null,
    provider: null,
    signer: null,
    isCorrectNetwork: false,
    setAddress: () => {},
    setProvider: () => {},
    setSigner: () => {},
    setIsCorrectNetwork: () => {},
})

const UserContextProvider = (props) => {
    const [address, setAddress] = useState(null)
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)

    return (
        <UserContext.Provider value={{
            address,
            provider,
            signer,
            isCorrectNetwork,
            setAddress,
            setProvider,
            setSigner,
            setIsCorrectNetwork
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, UserContextProvider as default};