import {  MdAccountCircle } from "react-icons/md"
import { useAuth } from "../context/AuthContext"
import { useSettings } from "../context/SettingContext"
import { LuLogOut } from "react-icons/lu"

interface ProfilePopupProps{
    handleOutsideClick:()=>void

}
const ProfilePopup = ({handleOutsideClick}:ProfilePopupProps) => {
    const{currentUser,logout} = useAuth()
    const{theme} = useSettings()
  return (
    <div className="fixed h-screen w-screen top-0 left-0 overflow-y-hidden bg-transparent z-20" onClick={handleOutsideClick}>
        <ul className="absolute right-4 top-16 z-30 rounded-2xl p-2">
            <li className={`flex gap-2 cursor-pointer p-2 items-center border-b-[1px] ${theme === 'dark'?'bg-[#504f4f] border-gray-600':'bg-[#e1e1e1] border-gray-400'}`}><MdAccountCircle className="text-4xl border-orange-500 border-[2px] rounded-full"/> <p className="flex flex-col text-[14px]"><span>{currentUser?.email}</span><span>{currentUser?.displayName??'anonymous'}</span></p></li>
            <li className={`flex gap-2 cursor-pointer justify-center p-2 items-center ${theme === 'dark'?'bg-[#504f4f]':'bg-[#e1e1e1] '}`} onClick={async()=>await logout()}><span>Logout</span> <LuLogOut/></li>
            
        </ul>
    </div>
  )
}

export default ProfilePopup
