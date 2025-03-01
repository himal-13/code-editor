import { BiPlus } from "react-icons/bi"
import Navbar from "../components/Navbar"
import { useSettings } from "../context/SettingContext"
import { CgCode } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import { useLoadingUser } from "../hooks/useLoadingUser"

const Homepage = () => {
    const{theme} = useSettings()
    const{loading} = useLoadingUser()
    const navigate= useNavigate()
    if(loading){
      return(
      <h1 className="text-4xl absolute left-1/2 top-1/2 -translate-1/2"> Loading...</h1>
    )
    }
  return (
    <div className={`min-h-screen max-w-full ${theme==='dark'?'bg-[#1F1F1F] text-white':'bg-white text-black'}`}>
        <Navbar/>

        <main className=" w-full relative ">
                  
        <div className={`absolute w-[90%] top-2 left-1/2 -translate-x-[50%] ${theme==='dark'?'bg-[#2E2E2E] ':'bg-[#4e4e4e] '}flex justify-between items-start p-4 rounded-2xl `}>
          <img src="/background-girl.png"  width={200} alt="" />
          <img src="/background-boy.png" width={200} alt="" />

        </div>
          <section className="sm:max-w-[60%] mx-auto p-4  relative z-10">
            <h3 className="text-3xl text-white">My Projects</h3>
            <div className="">

            </div>
          </section>
          <section className=" p-4 sm:max-w-[60%] left-1/2 -translate-x-1/2 flex  md:gap-[5vw] gap-4 relative z-10 ">
             <div className={`sm:h-[200px] w-[200px] p-[10px] border-[3px] border-orange-500 rounded-2xl flex flex-col justify-center items-center cursor-pointer ${theme==='dark'? 'hover:bg-[#2E2E2E] bg-[#2E2E2E] shadow-2xl':'hover:bg-gray-200 bg-white'}`}><BiPlus/><span>create</span> <span>New project</span></div>
             <div className={`sm:h-[200px] w-[200px] p-[10px] border-[1px] border-gray-500 rounded-2xl flex flex-col justify-center items-center cursor-pointer ${theme==='dark'? 'hover:bg-[#2E2E2E] bg-[#2E2E2E] shadow-2xl':'hover:bg-gray-200 bg-white'}`} onClick={()=>navigate('/playground')}><CgCode/><span>Playground</span></div>
          </section>
            
        </main>
    </div>
  )
}

export default Homepage
