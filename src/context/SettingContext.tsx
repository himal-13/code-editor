import React, { createContext, ReactNode, useState } from "react";



interface SettingsContextType{
    fullScreenMode: ('html' | 'css' | 'js')|'',
    changeFullScreenMode:(mode:'html'|'css'|'js')=>void,


}


const SettingsContext = createContext<SettingsContextType | null>(null)


const SettingsProvider:React.FC<{children:ReactNode}>= ({children})=>{
    const[fullScreenMode,setFullScreenMode] = useState<'html' | 'css' | 'js'|''>('')

        const changeFullScreenMode = (mode: 'html' | 'css' | 'js') => {
            setFullScreenMode(mode)
            if(fullScreenMode !==''){
                setFullScreenMode('')
            }

        }
    return(
        <SettingsContext.Provider value={{fullScreenMode,changeFullScreenMode,}}>
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

