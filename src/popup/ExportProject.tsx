import { BiDownload } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { MdFileUpload } from "react-icons/md"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { CircleLoader } from "react-spinners"
import saveAs from "file-saver"
import JSZip from "jszip"

interface ExportProjectProps{
  handleClose:()=>void,
  uploadProject:()=>void,
  jsCode:string,
  htmlCode:string,
  cssCode:string
}

const ExportProject = ({handleClose, uploadProject, cssCode,jsCode,htmlCode}:ExportProjectProps) => {
  const{currentUser,loading} = useAuth()
  const navigate = useNavigate()

  const handleSaveProject =async ()=>{
    if(!loading){
      if(!currentUser){
        navigate('/login')

      }else{
        uploadProject()
      }
      handleClose()
    }
  }

    const downloadZip = async()=>{
      try {
        handleClose()
              const zip = new JSZip();
              const fullHtml = `<!DOCTYPE html>
        <html>
          <head>
            <title>My Project</title>
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode.replace(/<html[\s\S]*?<\/html>/, '')}
            <script>${jsCode}</script>
          </body>
        </html>`;
        
              zip.file("index.html", fullHtml);
              zip.file("styles.css", cssCode);
              zip.file("app.js", jsCode);
              
              const content = await zip.generateAsync({ type: "blob" });
              saveAs(content, "project.zip");
            } catch (error) {
              console.error("Export failed:", error);
              alert("Export failed. Please check the console for details.");
            } 
    }




  return (
   <div className="fixed h-screen w-screen bg-[#1f1f1f] top-0 left-0 flex justify-center items-center z-40">
     <main className={`p-6 bg-white text-black min-w-[40vw] rounded-2xl min-h-[40vh]`}>
        {loading?<CircleLoader color="#444"/>:(
          <>
          <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Save options</h1> 
          <CgClose className="text-2xl cursor-pointer" onClick={handleClose}/>
        </div>
        <section className="p-2 m-4  ">
          <div className="flex gap-4 items-center hover:bg-[#e1e1e1] cursor-pointer p-4 rounded-md" onClick={handleSaveProject}>
          <MdFileUpload className="text-green-400 text-2xl" />
          <section className="">
            <h3>Save</h3>
            <p className="text-sm">Upload codes to database.</p>
          </section>
          </div>
          <div className="flex gap-4 items-center hover:bg-[#e1e1e1] cursor-pointer p-4 rounded-md" onClick={()=>downloadZip()}>
          <BiDownload className="text-red-400 text-2xl" />
          <section className="">
            <h3>Download</h3>
            <p className="text-sm">Download Zip file</p>
          </section>
          </div>
        </section>
          </>
        )}
     </main>
   </div>
  )
}

export default ExportProject
