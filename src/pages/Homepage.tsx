import AllCodesEditor from "../components/AllCodesEditor"
import Navbar from "../components/Navbar"
import { useSettings } from "../context/SettingContext"

const Homepage = () => {
    const{theme} = useSettings()
  return (
    <div className={`min-h-screen max-w-full ${theme==='dark'?'bg-gray-800 text-white':'bg-white text-black'}`}>
        <Navbar/>
        <main className=" flex flex-col justify-center items-center w-full">
            
            <AllCodesEditor/>

        </main>
    </div>
  )
}

export default Homepage
