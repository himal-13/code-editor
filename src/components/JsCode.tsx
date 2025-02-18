
interface JsProps{
    handleJsChange:(text:string)=>void
}

const JsCode = ({handleJsChange}:JsProps) => {
  return (
    <div className="flex-1 rounded-lg border-[1px] border-gray-600 m-2 flex flex-col overflow-x-hidden">
        <h3 className="py-2 px-3 text-3xl bg-gray-800 text-white font-bold">JavaScript</h3>
        <textarea name="jscode" id="jscodeinput" 
            placeholder="Enter your JavaScript code here" 
            className="resize-none h-[300px] w-full flex-1 outline-none p-2"
            onChange={(e)=>handleJsChange(e.target.value)} />


    </div>
  )
}

export default JsCode
