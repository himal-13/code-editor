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
    <div className=" rounded-lg border-[1px] border-gray-400 bg-white">
        <h3 className="p-3 bg-gray-800 text-white font-bold text-3xl">Preview</h3>
        <div className="h-screen">
            <iframe
            srcDoc={srcCode}
            title="Preview"
            sandbox="allow-scripts"
            className="min-h-full w-full "
            />

        </div>
        
    </div>
  )
}

export default OutPut
