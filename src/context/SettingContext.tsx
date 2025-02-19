import React, { createContext, ReactNode, useState } from "react";

interface SettingsContextType{
    fullScreenMode:boolean,
    changeFullScreenMode:()=>void

}


const SettingsContext = createContext<SettingsContextType | null>(null)


const SettingsProvider:React.FC<{children:ReactNode}>= ({children})=>{
    const[fullScreenMode,setFullScreenMode] = useState(false)

    const changeFullScreenMode =()=>{
        setFullScreenMode(!fullScreenMode)
    }


    return(
        <SettingsContext.Provider value={{fullScreenMode,changeFullScreenMode}}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider;

export const useSettings=() : SettingsContextType=>{
    const context = React.useContext(SettingsContext)
    if(!context){
        throw new Error('Something wrong in settings')
    }
    return context;
};

