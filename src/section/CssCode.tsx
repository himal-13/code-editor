import { Editor } from "@monaco-editor/react";
import { setupCSSSuggestions } from "./CssSuggetion";
import { useSettings } from "../context/SettingContext";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

interface CssProps{
    handleCssChange:(text:string)=>void,
    cssInput:string
}

const CssCode = ({handleCssChange, cssInput}:CssProps) => {
  const{fullScreenMode,changeFullScreenMode} = useSettings()
    const handleEditorDidMount = (_editor: any, monaco: any) => {
      setupCSSSuggestions(monaco);
    };

  return (
    <div className="flex-1 rounded-lg border-[1px] border-gray-600 m-2 flex flex-col ">
        <div className={`text-3xl bg-gray-800 text-white font-bold flex justify-between items-center`}>
           <span className="py-2 px-3 bg-gray-600">CSS</span>
           <section className={`flex gap-2 mx-2 flex-row`}>
                {fullScreenMode=='css'?<MdFullscreenExit className='cursor-pointer' onClick={()=>changeFullScreenMode('css')} /> :<MdFullscreen className='cursor-pointer' onClick={()=>changeFullScreenMode('css')}/>}
            </section>
        </div>
        <Editor
        defaultLanguage="css"
        value={cssInput}
        onChange={(value) => handleCssChange(value ?? '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        className="flex-1 mt-2 "
      />
    </div>
  )
}

export default CssCode;
