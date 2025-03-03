import { BiPlay, BiPlus } from "react-icons/bi"
import Navbar from "../components/Navbar"
import { useSettings } from "../context/SettingContext"
import { CgCode } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import { useLoadingUser } from "../hooks/useLoadingUser"
import { useEffect, useState } from "react"
import AddNewProject, { ProjectType } from "../popup/AddNewProject"
import { SquareLoader } from "react-spinners"
import { useAuth } from "../context/AuthContext"

const Homepage = () => {
    const{theme} = useSettings()
    const{currentUser,projects,projectLoading} = useAuth()
    const[myProjects,setMyProjects] = useState<ProjectType[]|[]>([])
    const{loading} = useLoadingUser()
    const[showNewProjectMenu,setShowNewProjectMenu] = useState(false)
    const navigate= useNavigate()

    const getMyProjects = async()=>{
      if(currentUser && projects && projects.length>0){
        setMyProjects(projects.filter((proj)=>proj.admins.includes(currentUser.uid)))

      }
      console.log(projects)

    }

    useEffect(()=>{
      getMyProjects()
      
    },[currentUser])



    if(loading){
      return(
      <h1 className="text-4xl absolute left-1/2 top-1/2 -translate-1/2"> Loading...</h1>
    )
    }
  return (
    <div className={`min-h-screen max-w-full ${theme==='dark'?'bg-[#1F1F1F] text-white':'bg-white text-black'}`}>
        <Navbar/>

        <main className=" w-full relative ">
                  
        <div className={`absolute w-[99%] sm:w-[90%] top-2 left-1/2 -translate-x-[50%] overflow-x-hidden ${theme==='dark'?'bg-[#2E2E2E] ':'bg-[#4e4e4e] '}flex justify-between items-start sm:p-4 rounded-md sm:rounded-2xl `}>
          <img src="/background-girl.png"  width={200} alt="" />
          <img src="/background-boy.png" width={200} alt="" />

        </div>
        <div className="sm:mt-0 pt-[5vh]">
          <section className="sm:max-w-[60%] mx-auto p-4 relative z-10">
            <h3 className="text-3xl text-white">My Projects</h3>
            <div className="">

            </div>
          </section>
          {projectLoading || loading?(
            <div className="absolute left-1/2">
            <SquareLoader color={`${theme==='dark'?'':''}`}size={50}/>
            </div>
          ):(
            
          <section className=" p-4 sm:max-w-[60%] left-1/2 -translate-x-1/2 grid md:gap-[3vw] sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 relative z-10 ">
             <div onClick={()=>setShowNewProjectMenu(true)} className={`p-8 border-[3px] border-orange-500 rounded-2xl flex flex-col justify-center items-center cursor-pointer ${theme==='dark'? 'hover:bg-[#2E2E2E] bg-[#2E2E2E] shadow-2xl':'hover:bg-gray-200 bg-white'}`}><BiPlus className="text-3xl"/><span>create</span> <span className=" hidden sm:inline text-nowrap">New project</span></div>
             {
              myProjects.length>0 && myProjects.map((project)=>(
              <div className={`p-8 border-[1px] border-gray-500 rounded-2xl flex flex-col justify-center items-center cursor-pointer ${theme==='dark'? 'hover:bg-[#2E2E2E] bg-[#2E2E2E] shadow-2xl':'hover:bg-gray-200 bg-white'}`} onClick={()=>navigate(`/project/${project.id}`)} key={project.id}><CgCode/><span className="text-center">{project.title}</span></div>

              ))
             }
             <div className={`p-8 border-[1px] border-gray-500 rounded-2xl flex flex-col justify-center items-center cursor-pointer ${theme==='dark'? 'hover:bg-[#2E2E2E] bg-[#2E2E2E] shadow-2xl':'hover:bg-gray-200 bg-white'}`} onClick={()=>navigate('/playground')}><BiPlay className="text-3xl"/><span>Playground</span></div>
          </section>
            )
          }
          </div>
        </main>
        {showNewProjectMenu && <AddNewProject  handleClose={()=>setShowNewProjectMenu(false)}/>}
    </div>
  )
}

export default Homepage
