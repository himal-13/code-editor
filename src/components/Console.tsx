import { Editor } from "@monaco-editor/react"
import { useSettings } from "../context/SettingContext";

interface ConsoleCodeType{
  message:String,
  type:'log'|'error'
}

interface ConsoleProps{
  jsCode:string,
  handleChangeCode:(text:string)=>void,
  consoleCode:ConsoleCodeType[]
  runCode:()=>void

}

const Console = ({jsCode,handleChangeCode,consoleCode,runCode}:ConsoleProps) => {
  const{theme} = useSettings()

  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>

    <div className="min-h-[50vh] flex lg:flex-row flex-col gap-2 font-mono text-sm">
      <div className="flex-1 h-[50vh] ">
        <Editor language="javascript" height={'90%'} width={"100%"} value={jsCode} className="min-h-[20vh]" onChange={(value)=>handleChangeCode(value??'')} 
         options={{
          minimap: { enabled: false },
          fontSize: 14,
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }} 
/>
       </div>
      <section className="flex-1">
        <button className="bg-gray-600 text-white font-bold px-4 py-2 rounded-mg hover:bg-gray-500 rounded-sm my-1 cursor-pointer" onClick={()=>runCode()}>Run code</button>
        <div className="border-[1px] border-gray-500 h-[40vh] max-w-full p-2">
          {consoleCode.map((log,i)=>(
            <p className={`${log.type ==='log'?`${theme==='light'?'black':'white'}`:'text-red-500'} font-bold`} key={i}>{log.message}</p>
          ))}

        </div>

      </section>
    </div>
  </div>
  )
}

export default Console;
