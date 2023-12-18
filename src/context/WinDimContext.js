import { createContext, useEffect, useState } from "react";

const WinDimContext = createContext({
    width: window.innerWidth,
    height: window.innerHeight
})

const WinDimContextProvider = (props) => {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension);
        };
    }, [screenSize]);

    return (
        <WinDimContext.Provider value={{
            width: screenSize.width,
            height: screenSize.height
        }}>
            {props.children}
        </WinDimContext.Provider>
    )
}

export {WinDimContext, WinDimContextProvider as default};