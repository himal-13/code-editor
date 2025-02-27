import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth"
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { auth } from "../services/Firebase"


interface AuthContextType{
    currentUser:User|null,
    loading:boolean,
    signup:(email:string,password:string)=>Promise<UserCredential>
    login:(email:string,password:string)=>Promise<UserCredential>
    logout:()=>Promise<void>

}
const AuthContext = createContext<AuthContextType |null>(null)

const AuthProvider:React.FC<{children:ReactNode}>=({children})=>{
    const[currentUser,setCurrentUser] = useState<User |null>(null)
    const[loading,setLoading] = useState(true)

    

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            setLoading(false)        
        })
    
        return ()=>unSubscribe()

    },[])
    const signup = useCallback((email:string, password:string) => {
        return createUserWithEmailAndPassword(auth, email, password);
      }, []);
    
      const login = useCallback((email:string, password:string) => {
        return signInWithEmailAndPassword(auth, email, password);
      }, []);
    
      const logout = useCallback(() => {
        return signOut(auth);
      }, []);

      const value =  useMemo(
        () => ({
          currentUser,
          loading,
          signup,
          login,
          logout,

        }),
        [
          currentUser,
          loading,
          signup,
          login,
          logout,

        ]
    )
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
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
