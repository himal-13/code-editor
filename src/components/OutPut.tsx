import { useEffect, useState } from "react"

interface OutPutProps{
    htmlCode:string,
    cssCode:string,
    jsCode:string
}
const OutPut = ({htmlCode,cssCode,jsCode}:OutPutProps) => {

    const[srcCode,setSrcCode] = useState(`

                    `)

    useEffect(()=>{

        const outPut = setTimeout(()=>{
            setSrcCode(`
                <html>
                    <body>${htmlCode}</body>
                    <style>${cssCode}</style>
                    <script>${jsCode}</script>
                </html>
                    `)
        },300)

        return ()=>clearTimeout(outPut)


    },[htmlCode,cssCode,jsCode])


  return (
    <div className=" m-2 rounded-lg border-[1px] border-gray-400 ">
        <h3 className="p-3 bg-gray-800 text-white font-bold text-3xl">Preview</h3>
        <div className="h-screen p-2">
            <iframe
            srcDoc={srcCode}
            title="Preview"
            sandbox="allow-scripts"
            className="min-h-full max-w-full"
            />

        </div>
        
    </div>
  )
}

export default OutPut
