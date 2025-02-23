import React, { createContext, ReactNode, useState } from "react";



interface SettingsContextType{
    fullScreenMode: ('html' | 'css' | 'js')|'',
    changeFullScreenMode:(mode:'html'|'css'|'js')=>void,
    theme:"light"|"dark",
    toggleTheme:()=>void


}


const SettingsContext = createContext<SettingsContextType | null>(null)


const SettingsProvider:React.FC<{children:ReactNode}>= ({children})=>{
    const[fullScreenMode,setFullScreenMode] = useState<'html' | 'css' | 'js'|''>('')
    const[theme,setTheme] = useState<'light'|'dark'>('light')

        const changeFullScreenMode = (mode: 'html' | 'css' | 'js') => {
            setFullScreenMode(mode)
            if(fullScreenMode !==''){
                setFullScreenMode('')
            }

        }

        const toggleTheme =()=>{
            setTheme(prev=>{
                let current:'light'|'dark'= prev;
                if(current ==='light'){
                    current ='dark'
                }else{
                    current ='light'
                }
                return current;
            })
        }
    return(
        <SettingsContext.Provider value={{fullScreenMode,changeFullScreenMode,toggleTheme,theme}}>
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

