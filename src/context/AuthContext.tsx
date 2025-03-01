import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth"
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { auth, db,} from "../services/Firebase"
import { collection, getDocs } from "firebase/firestore"


interface AuthContextType{
    currentUser:User|null,
    loading:boolean,
    signup:(email:string,password:string)=>Promise<UserCredential>
    login:(email:string,password:string)=>Promise<UserCredential>
    logout:()=>Promise<void>,
    dbUser:dbUserType | undefined,
    alldbUsers:dbUserType[] | []

}

export interface dbUserType{
  userName:string,
  id?:string,
  email:string

}
const AuthContext = createContext<AuthContextType |null>(null)

const AuthProvider:React.FC<{children:ReactNode}>=({children})=>{
    const[currentUser,setCurrentUser] = useState<User |null>(null)
    const[dbUser,setdbUser] = useState<dbUserType | undefined>(undefined)
    const[alldbUsers,setAlldbUsers] = useState<dbUserType[]|[]>([])
    const[loading,setLoading] = useState(true)

    
    const getdbUsers = async()=>{
      const querrySnapshot = await getDocs(collection(db,'users'));
      const fetchData = querrySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), 
        })as dbUserType)
        setAlldbUsers(fetchData)
        if(alldbUsers.length>0 && currentUser){
          setdbUser(fetchData.find((d)=>d.email == currentUser.email))

        }
        console.log(fetchData)

    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)

        })
        getdbUsers()
        setLoading(false)        
    
        return ()=>unSubscribe()

    },[])
    const signup = useCallback((email:string, password:string) => {
        return createUserWithEmailAndPassword(auth, email, password);
      }, [auth]);
    
      const login = useCallback((email:string, password:string) => {
        return signInWithEmailAndPassword(auth, email, password);
      }, [auth]);
    
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
          dbUser,
          alldbUsers

        }),
        [
          currentUser,
          loading,
          signup,
          login,
          logout,
          alldbUsers

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
