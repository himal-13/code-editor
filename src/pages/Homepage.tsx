import { BiPlus } from "react-icons/bi"
import Navbar from "../components/Navbar"
import { useSettings } from "../context/SettingContext"
import { CgCode } from "react-icons/cg"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
    const{theme} = useSettings()
    const navigate= useNavigate()
  return (
    <div className={`min-h-screen max-w-full ${theme==='dark'?'bg-gray-800 text-white':'bg-white text-black'}`}>
        <Navbar/>
        <main className=" w-full">
          <section className="sm:max-w-[60%] mx-auto p-4 border-b-[1px] border-gray-400">
            <h3 className="text-3xl">My Projects</h3>
            <div className="">

            </div>
          </section>
          <section className=" p-4 max-w-full flex justify-center gap-[10vw] ">
             <div className={`h-[200px] w-[200px] p-[10px] border-[1px] border-gray-500 rounded-2xl flex flex-col justify-center items-center cursor-pointer ${theme==='dark'? 'hover:bg-gray-700':'hover:bg-gray-200'}`}><BiPlus/><span>create</span> <span>New project</span></div>
             <div className={`h-[200px] w-[200px] p-[10px] border-[1px] border-gray-500 rounded-2xl flex flex-col justify-center items-center cursor-pointer ${theme==='dark'? 'hover:bg-gray-700':'hover:bg-gray-200'}`} onClick={()=>navigate('/playground')}><CgCode/><span>Playground</span></div>
          </section>
            
        </main>
    </div>
  )
}

export default Homepage
