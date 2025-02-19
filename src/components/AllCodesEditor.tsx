import { useState } from "react"
import CssCode from "./CssCode"
import HtmlCode from "./HtmlCode"
import JsCode from "./JsCode"
import OutPut from "./OutPut"

const AllCodesEditor = () => {
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
    </>
  )
}

export default AllCodesEditor
