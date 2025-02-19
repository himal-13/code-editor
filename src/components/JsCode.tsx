import { Editor } from "@monaco-editor/react"
import { setupJSSuggestions } from "./JSSuggetsion";

interface JsProps{
    handleJsChange:(text:string)=>void,
    jsInput:string
}

const JsCode = ({handleJsChange,jsInput}:JsProps) => {
    const handleEditorDidMount = (_editor: any, monaco: any) => {
      setupJSSuggestions(monaco);
    };
  return (
    <div className="flex-1 rounded-lg border-[1px] border-gray-600 m-2 flex flex-col overflow-x-hidden">
        <h3 className="py-2 px-3 text-3xl bg-gray-800 text-white font-bold">JavaScript</h3>
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
        className="flex-1 m-2 min-h-[200px] "
      />
    </div>
  )
}

export default JsCode
