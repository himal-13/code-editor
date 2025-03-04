import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth"
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { auth, db,} from "../services/Firebase"
import { collection, doc,  getDocs, updateDoc } from "firebase/firestore"
import { ProjectType } from "../popup/AddNewProject"


interface UpdateProjectArgs{
  projectId:string,
  html:string,
  js:string,
  css:string
}
interface AuthContextType{
    currentUser:User|null,
    loading:boolean,
    signup:(email:string,password:string)=>Promise<UserCredential>
    login:(email:string,password:string)=>Promise<UserCredential>
    logout:()=>Promise<void>,
    dbUser:dbUserType | undefined,
    alldbUsers:dbUserType[] | [],
    projectLoading:boolean,
    projects:ProjectType[]| undefined,
    updateProject:({projectId,html,css,js}:UpdateProjectArgs)=>Promise<void>

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
    const[projectLoading,setProjectLoading] = useState(true)
    const[projects,setProjects] = useState<ProjectType[]| undefined>()

    
    const getdbUsers = async () => {
      if(currentUser && !loading){
        setLoading(true)
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        let currentDbUser: dbUserType | undefined = undefined;
        const fetchData = querySnapshot.docs.map((doc) => {
          const userData = { id: doc.id, ...doc.data() } as dbUserType;
          
          if (currentUser.email === userData.email) {
            currentDbUser = userData;
          }
          
          return userData;
        });
    
        setAlldbUsers(fetchData);
        setdbUser(currentDbUser ?? undefined);
    
      } catch (error) {
        console.error('Error fetching users:', error);
        setdbUser(undefined);
      }finally{
        setLoading(false)
      }
    }
    };
    useEffect(() => {
      const fetchData = async () => {
        await getdbUsers();
      };
      fetchData();
    }, [currentUser]);

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)

        })
        setLoading(false)        
    
        return ()=>unSubscribe()

    },[])


            const getProjects = async()=>{
                setProjectLoading(true)
                try{
                    const querrySnapshotProjects = await getDocs(collection(db,'projects'))
                    const fetchProjects = querrySnapshotProjects.docs.map((proj)=>({
                        id:proj.id,
                        ...proj.data()
                    })as ProjectType)
                    setProjects(fetchProjects)
    
                }catch(e){
    
                }finally{
                    setProjectLoading(false)
                }
            }

            useEffect(()=>{
              const projectData = async()=>{
                await getProjects()
              }
              projectData()

            },[currentUser])

            const updateProject = async({projectId,html,css,js}:UpdateProjectArgs)=>{
              if(projectId =='')return;
              try{
                const projectRef = doc(db,'projects',projectId)
                await updateDoc(projectRef,{
                  htmlCode:html,
                  cssCode:css,
                  jsCode:js                  

                })
                await getProjects()

              }catch(e){

              }
            }
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
          alldbUsers,
          projectLoading,
          projects,
          updateProject

        }),
        [
          currentUser,
          loading,
          signup,
          login,
          logout,
          alldbUsers,
          projects

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
