import { Editor } from "@monaco-editor/react"
import { setupHTMLSuggestions } from "./HtmlSuggestion";

interface HtmlPrps{
    handleHtmlChange:(text:string)=>void,
    htmlInput:string
}

const HtmlCode = ({handleHtmlChange, htmlInput}:HtmlPrps) => {

      const handleEditorDidMount = (_editor: any, monaco: any) => {
        setupHTMLSuggestions(monaco);
      };


  
  return (
    <div className="flex-1 rounded-lg border-[1px] border-gray-600 m-2 flex flex-col overflow-x-hidden">
        <h3 className="py-2 px-3 text-3xl bg-gray-800 text-white font-bold">HTML</h3>
      
             <Editor
                defaultLanguage="html" 
                onChange={(e)=>handleHtmlChange(e??'')}
                defaultValue={`<html>
    <head>
        <title>Document</title>
    </head>
    <body>
        <h1>Hello world!</h1>                            
    </body>
</html>`}
                value={htmlInput}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                className="flex-1 mt-2 min-h-[200px]"/>

    </div>
  )
}

export default HtmlCode
