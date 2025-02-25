import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { auth } from "../assets/services/Firebase"


interface AuthContextType{
    currentUser:User|null

}
const AuthContext = createContext<AuthContextType |null>(null)

const AuthProvider:React.FC<{children:ReactNode}>=({children})=>{
    const[currentUser,setCurrentUser] = useState<User |null>(null)

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
        
        })
    

        return ()=>unSubscribe()

    },[])


    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;

export const useAuth = ():AuthContextType=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('something went wrong while getting user')
    }
    return context;
}
