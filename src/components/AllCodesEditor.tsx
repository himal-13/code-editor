import { useState } from "react"
import CssCode from "../section/CssCode"
import HtmlCode from "../section/HtmlCode"
import JsCode from "../section/JsCode"
import OutPut from "./OutPut"
import { useSettings } from "../context/SettingContext"

const AllCodesEditor = () => {
  const{fullScreenMode,changeFullScreenMode} = useSettings()
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
    <div className="w-[90%] xl:w-full h-[300px] gap-[3px] my-4 hidden lg:flex  justify-center">
        <HtmlCode htmlInput={htmlCode} handleHtmlChange={(text)=>setHtmlCode(text)}/>
        <CssCode cssInput={cssCode} handleCssChange={(text)=>setCssCode(text)}/>
        <JsCode jsInput={jsCode} handleJsChange={(text)=>setJsCode(text)} />
    </div>
    <div className="m-4 flex gap-4 lg:hidden justify-center">
      {['html','css','js'].map((mod,i)=>(
        <div className="min-h-[10vh] border-[1px] border-gray-500 cursor-pointer " key={i} onClick={()=>changeFullScreenMode(mod as('html'|'css'|'js'))}>
          <h1 className="text-white bg-gray-800 font-bold px-2">{mod.toUpperCase()}</h1>
          <div className="">
            <p className="text-[12px] text-gray-800 m-2">click here to write {mod.toUpperCase()}</p>
          </div>
        </div>
      ))}

    </div>
    <OutPut cssCode={cssCode} htmlCode={htmlCode} jsCode={jsCode} />
    <div className={`fixed z-10 top-0 left-0 h-screen w-screen bg-gray-800/80 justify-center items-center ${fullScreenMode===''?'hidden':'flex'}`}>
        <main className="flex p-6 rounded-lg bg-white w-[95%] sm:w-[90%] lg:w-[80%] h-[90vh] lg:h-[70vh]">
          {fullScreenMode==='html' &&   <HtmlCode htmlInput={htmlCode} handleHtmlChange={(text)=>setHtmlCode(text)}/> }
          {fullScreenMode==='css' && <CssCode cssInput={cssCode} handleCssChange={(text)=>setCssCode(text)}/>}
          {fullScreenMode==='js' && <JsCode jsInput={jsCode} handleJsChange={(text)=>setJsCode(text)} />}

        </main>
     </div>
    </>
  )
}

export default AllCodesEditor
