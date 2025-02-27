import { FiMoon, FiSun } from "react-icons/fi"
import { useSettings } from "../context/SettingContext"
import { MdAccountCircle } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LuLogIn } from "react-icons/lu"
import { useState } from "react"
import ProfilePopup from "../popup/ProfilePopup"

const Navbar = () => {
    const{theme,toggleTheme} = useSettings()
    const{currentUser,loading} = useAuth()
    const[moreProfileMode,setMoreProfile] = useState(false)
    const navigate = useNavigate()
    if(loading)return(<h1 className="text-4xl">Loading...</h1>)
  return (
    <header className={`flex justify-between items-center p-4  ${theme=='dark'?'bg-[#1F1F1F] text-white':'bg-white text-black'}`}>
  <div>
          <h1 className="text-2xl font-bold cursor-pointer" onClick={()=>navigate('/')}>DevCode Editor</h1>
          <p className="text-sm text-gray-500 sm:block hidden">A powerful web development playground</p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-gray-500 cursor-pointer"
          >
            {theme === 'dark' ? <FiSun size={30} /> : <FiMoon size={30} />}
          </button>
          {currentUser?(
            <button className="cursor-pointer">
            <MdAccountCircle className="border-2 border-amber-400 rounded-full " size={30} onClick={()=>setMoreProfile(!moreProfileMode)}/>
          </button>
          ):(
            <button className="cursor-pointer flex items-center gap-1" onClick={()=>navigate('/login')}>
              <span>Login</span>
            <LuLogIn className=" rounded-full " size={30} />

            </button>
          )}
          {moreProfileMode && <ProfilePopup handleOutsideClick={()=>setMoreProfile(false)}/>}
          </div>
    </header>
  )
}

export default Navbar
