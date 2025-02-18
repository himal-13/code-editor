import { useState } from "react"
import CssCode from "./CssCode"
import HtmlCode from "./HtmlCode"
import JsCode from "./JsCode"
import OutPut from "./OutPut"

const AllCodesEditor = () => {
    const[htmlCode,setHtmlCode] = useState('')
    const[cssCode,setCssCode] = useState('')
    const[jsCode,setJsCode] = useState('')
  return (
    <>
    <div className="w-full flex h-[400px] gap-[10px] my-4">
        <HtmlCode handleHtmlChange={(text)=>setHtmlCode(text)}/>
        <CssCode handleCssChange={(text)=>setCssCode(text)}/>
        <JsCode handleJsChange={(text)=>setJsCode(text)} />
    </div>
    <OutPut cssCode={cssCode} htmlCode={htmlCode} jsCode={jsCode} />
    </>
  )
}

export default AllCodesEditor
