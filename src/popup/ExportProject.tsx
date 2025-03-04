import { BiDownload } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { MdFileUpload } from "react-icons/md"

const ExportProject = ({handleClose, uploadProject}:{handleClose:()=>void, uploadProject:()=>void}) => {


  return (
   <div className="fixed h-screen w-screen bg-[#1f1f1f]/85 top-0 left-0 flex justify-center items-center z-40">
     <main className={`p-6 bg-white text-black min-w-[40vw] rounded-2xl min-h-[40vh]`}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Save options</h1> 
          <CgClose className="text-2xl cursor-pointer" onClick={handleClose}/>
        </div>
        <section className="p-2 m-4  ">
          <div className="flex gap-4 items-center hover:bg-[#e1e1e1] cursor-pointer p-4 rounded-md" onClick={async()=>await uploadProject()}>
          <MdFileUpload className="text-green-400 text-2xl" />
          <section className="">
            <h3>Save</h3>
            <p className="text-sm">Upload codes to database.</p>
          </section>
          </div>
          <div className="flex gap-4 items-center hover:bg-[#e1e1e1] cursor-pointer p-4 rounded-md">
          <BiDownload className="text-red-400 text-2xl" />
          <section className="">
            <h3>Download</h3>
            <p className="text-sm">Download Zip file</p>
          </section>
          </div>
        </section>
     </main>
   </div>
  )
}

export default ExportProject
