import { Editor } from "@monaco-editor/react"
import { setupJSSuggestions } from "./JSSuggetsion";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { useSettings } from "../context/SettingContext";

interface JsProps{
    handleJsChange:(text:string)=>void,
    jsInput:string
}

const JsCode = ({handleJsChange,jsInput}:JsProps) => {
  const{fullScreenMode,changeFullScreenMode} = useSettings()
    const handleEditorDidMount = (_editor: any, monaco: any) => {
      setupJSSuggestions(monaco);
    };


  return (
    <div className={`flex-1 rounded-lg border-[1px] border-gray-600 m-2 flex flex-col `}>
        <div className={`text-3xl bg-gray-800 text-white font-bold flex justify-between items-center`}>
           <span className="py-2 px-3 bg-gray-600">JS</span>
           <section className={`flex gap-2 mx-2 flex-row`}>
                  {fullScreenMode==='js'?<MdFullscreenExit className='cursor-pointer' onClick={()=>changeFullScreenMode('js')} /> :<MdFullscreen className='cursor-pointer' onClick={()=>changeFullScreenMode('js')}/>}
            </section>
        </div>
        <Editor
        height="400px"
        defaultLanguage="javascript"
        value={jsInput}
        onChange={(value) => handleJsChange(value ?? '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        className={`flex-1 m-2 min-h-[200px] `}      />
    </div>
  )
}

export default JsCode
