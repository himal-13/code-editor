import { useState } from "react"
import CssCode from "../section/CssCode"
import HtmlCode from "../section/HtmlCode"
import JsCode from "../section/JsCode"
import OutPut from "./OutPut"
import { useSettings } from "../context/SettingContext"

const AllCodesEditor = () => {
  const{fullScreenMode} = useSettings()
    const[htmlCode,setHtmlCode] = useState(`<html>
      <head>
         <title>Document</title>
      </head>
      <body>
          <h1>Hello world!</h1>
      </body>
</html>`)
    const[cssCode,setCssCode] = useState('')
    const[jsCode,setJsCode] = useState('')
  return (
    <>
    <div className="w-full flex h-[300px] gap-[10px] my-4 ">
        <HtmlCode htmlInput={htmlCode} handleHtmlChange={(text)=>setHtmlCode(text)}/>
        <CssCode cssInput={cssCode} handleCssChange={(text)=>setCssCode(text)}/>
        <JsCode jsInput={jsCode} handleJsChange={(text)=>setJsCode(text)} />
    </div>
    <OutPut cssCode={cssCode} htmlCode={htmlCode} jsCode={jsCode} />
    <div className={`fixed z-10 top-0 left-0 h-screen w-screen bg-gray-800/80 justify-center items-center ${fullScreenMode===''?'hidden':'flex'}`}>
        <main className="flex p-6 rounded-lg bg-white w-[80%] h-[70vh]">
          {fullScreenMode==='html' &&   <HtmlCode htmlInput={htmlCode} handleHtmlChange={(text)=>setHtmlCode(text)}/> }
          {fullScreenMode==='css' && <CssCode cssInput={cssCode} handleCssChange={(text)=>setCssCode(text)}/>}
          {fullScreenMode==='js' && <JsCode jsInput={jsCode} handleJsChange={(text)=>setJsCode(text)} />}

        </main>
     </div>
    </>
  )
}

export default AllCodesEditor
