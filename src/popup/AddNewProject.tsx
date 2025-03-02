import { ClipLoader} from "react-spinners"
import { useSettings } from "../context/SettingContext"
import { IoMdClose } from "react-icons/io"
import { useEffect, useState } from "react"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../services/Firebase"
import { MdErrorOutline } from "react-icons/md"
import { SiTicktick } from "react-icons/si"
import { useAuth } from "../context/AuthContext"

interface ProjectType{
  title:string,
  description:string,
  id?:string
}

const AddNewProject = ({handleClose}:{handleClose:()=>void}) => {
    const{theme} = useSettings()
    const[projectTitle,setProjectTitle] = useState('')
    const[showLoaiding,setShowLoading] = useState(false)
    const[projectError,setError] = useState(false)
    const{currentUser} = useAuth()
    const[projectVisiability,setProjectVisiabilty] = useState('public')

    // const[creatingProjectLoading,setCreatingProjectLoading] = useState(false)

    const handleProjectTitleChange =async(e:React.ChangeEvent<HTMLInputElement>)=>{
      setShowLoading(true)
      setProjectTitle(e.target.value)
 
    }

    useEffect(()=>{
      checkProjectTitle()

    },[projectTitle])

    const checkProjectTitle = async()=>{
      try{
        const querrySnapshotProjects = await getDocs(collection(db,'projects'))
        const fetchData = querrySnapshotProjects.docs.map((project)=>({
          id:project.id,
          ...project.data()
        })as ProjectType)
        const allProjectTitle = fetchData.map((data)=>data.title)
        if(allProjectTitle.includes(projectTitle.trim())){
          setError(true)
        }else{
          setError(false)
        }
        console.log(allProjectTitle)

    }catch(e){

    }finally{
      setShowLoading(false)

    }
  }

  const handleCreateProject = async()=>{
    if(projectTitle.trim().length<4 || projectError ||!currentUser)return;
    try{
      await addDoc(collection(db,'projects'),{
        title:projectTitle,
        htmlCode:'',
        cssCode:'',
        jsCode:'',
        contributor:[
          {userName:currentUser.displayName,
           userType:'Admin',
           email:currentUser.email
          }
        ],
        isPublic:projectVisiability ==='public'?true:false

      })
      console.log('project created')

    }catch(e){

    }finally{

    }

  }
  return (
    <div className="fixed top-0 bg-black/80 h-screen w-screen z-[40]" >
        <div  className={`p-6 rounded-xl min-h-[40vh] absolute top-1/2 left-1/2 -translate-1/2 z-[50] w-[40vw] border-[.5px] ${theme==='dark'?'bg-[#0a0a0a] border-white shadow-2xl text-white':'bg-white border-black'}`}>
          <h2 className="text-3xl flex items-center my-2"><IoMdClose className="opacity-50 cursor-pointer" onClick={handleClose}/>Create Project</h2>
          <section className="mx-4">
          <select name="" id="project-type" className="" value={projectVisiability} onChange={(e)=>setProjectVisiabilty(e.target.value)}>
              <option value="public" className="text-[14px]">Public</option>
              <option value="private">Private</option>
            </select>
          <section className="m-4">
          </section>
            <label htmlFor="project-name">Project Name</label><br />
            <div className="relative inline-block">
              <input type="text" id="project-name" onChange={(e)=>handleProjectTitleChange(e)} value={projectTitle} className={`border-b-[1px] ${projectError? 'border-red-500':' border-gray'}-500 outline-none px-2 py-1`} placeholder="project123" />
              {projectTitle.trim() ==''?(<p className="text-xs text-red-500">Title required</p>):( projectTitle.trim().length <4 && <p className="text-xs text-red-500">Title should be at least 4 character long.</p>)}
              <p className="text-red-600 text-xs">{projectError && "Project title exists."}</p>
              <ClipLoader className="absolute right-0 bottom-5" size={20} color="#23f" loading={showLoaiding} speedMultiplier={.8}/>
              {!showLoaiding && projectTitle.trim() !=='' &&( projectTitle.trim().length> 4 && !projectError ? <SiTicktick className="absolute right-0 bottom-2 text-2xl text-green-500" />:<MdErrorOutline className="absolute right-0 bottom-5 text-2xl text-red-500" />)}
            </div>
          </section>
          <section className="text-end m-4">
            <button onClick={handleClose} className={`px-4 py-2 border-[.1px] cursor-pointer mr-4 text-[19px] rounded-xl ${theme==='dark'?'border-gray-800 bg-[#0f0f0f]':'border-gray-200 bg-[#f0f0f0]'} `}>close</button>
            <button onClick={handleCreateProject} className={`px-4 py-2 border-[.1px] cursor-pointer mr-4 text-[19px] rounded-xl ${theme==='dark'?'border-gray-800 bg-[#f0f0f0] text-black hover:bg-[#a1a1a1]':'border-gray-200 bg-[#0f0f0f] text-white hover:bg-[#1a1a1a]'}`}>create</button>
          </section>
         

        </div>

    </div>
  )
}

export default AddNewProject
