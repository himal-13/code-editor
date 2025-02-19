import { Editor } from "@monaco-editor/react";
import { setupCSSSuggestions } from "./CssSuggetion";

interface CssProps{
    handleCssChange:(text:string)=>void,
    cssInput:string
}

const CssCode = ({handleCssChange, cssInput}:CssProps) => {
    const handleEditorDidMount = (_editor: any, monaco: any) => {
      setupCSSSuggestions(monaco);
    };

  return (
    <div className="flex-1 rounded-lg border-[1px] border-gray-600 m-2 flex flex-col overflow-x-hidden">
        <h3 className="py-2 px-3 text-3xl bg-gray-800 text-white font-bold">CSS</h3>
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
        className="flex-1 mt-2 min-h-[200px]"
      />
    </div>
  )
}

export default CssCode;
