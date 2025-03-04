import Navbar from "../components/Navbar"
import AllCodesEditor from "../components/AllCodesEditor"
import { useParams } from "react-router-dom"

const ProjectPage = () => {
    const params = useParams()
  return (
    <div className="">
        <Navbar/>
        <h2>Project id:{params.id}</h2>
        <main>
            <AllCodesEditor projectId={params.id??''}/>

        </main>
    </div>
  )
}

export default ProjectPage
