import { useState, useEffect } from "react";
import CssCode from "../section/CssCode";
import HtmlCode from "../section/HtmlCode";
import JsCode from "../section/JsCode";
import OutPut from "./OutPut";
import { useSettings } from "../context/SettingContext";
import { FiSun, FiMoon, FiSave, FiTerminal} from "react-icons/fi";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Console from "./Console";

interface LogEntry {
  message: string;
  type: "log" | "error";
}

const AllCodesEditor = () => {
  const { fullScreenMode, changeFullScreenMode, theme, toggleTheme } = useSettings();
  const [cssCode, setCssCode] = useState('body { margin: 0; padding: 20px; }');
  const [jsCode, setJsCode] = useState('console.log("Hello from JS!");');
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html>
  <head>
    <title>My Project</title>
    <style>${cssCode}</style>
  </head>
  <body>
    <h1>Hello World!</h1>
    <script>${jsCode}</script>
  </body>
</html>`);

  const [consoleCode, setConsoleCode] = useState<LogEntry[]>([]);
  const [activeFeature, setActiveFeature] = useState<"editor" | "console">("editor");
  const [isExporting, setIsExporting] = useState(false);

  // Console capture
  useEffect(() => {
    const originalLog = console.log;
    console.log = (...args) => {
      originalLog(...args);
    };
    return () => {
      console.log = originalLog;
    };
  }, []);

  
  const runCode = () => {
    const logEntries: LogEntry[] = [];
    const originalConsoleLog = console.log;

    // Override console.log to capture log outputs
    console.log = (...args: any[]) => {
      logEntries.push({ message: args.join(" "), type: "log" });
      originalConsoleLog(...args);
    };

    try {
      // Execute the user code
      new Function(jsCode)();
    } catch (error: any) {
      // Capture errors with red styling
      logEntries.push({ message: error.message, type: "error" });
    }

    // Restore the original console.log
    console.log = originalConsoleLog;
    setConsoleCode(logEntries);
  };

  const exportProject = async () => {
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      const zip = new JSZip();
      const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <title>My Project</title>
    <style>${cssCode}</style>
  </head>
  <body>
    ${htmlCode.replace(/<html[\s\S]*?<\/html>/, '')}
    <script>${jsCode}</script>
  </body>
</html>`;

      zip.file("index.html", fullHtml);
      zip.file("styles.css", cssCode);
      zip.file("app.js", jsCode);
      
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "project.zip");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please check the console for details.");
    } finally {
      setIsExporting(false);
    }
  };




  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className="p-4 border-b flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">DevCode Editor</h1>
          <p className="text-sm text-gray-500 sm:block hidden">A powerful web development playground</p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button
            onClick={exportProject}
            disabled={isExporting}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              isExporting 
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <FiSave /> {isExporting ? "Exporting..." : "Export"}
          </button>
        </div>
      </header>

      <div className="p-4">
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveFeature('editor')}
            className={`px-4 py-2 rounded ${
              activeFeature === 'editor' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-200 dark:bg-gray-700'
            }`}
          >
            Code Editor
          </button>
          <button
            onClick={() => setActiveFeature('console')}
            className={`px-4 py-2 rounded ${
              activeFeature === 'console' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-200 dark:bg-gray-700'
            }`}
          >
            <FiTerminal /> Console
          </button>
        </div>

        {activeFeature === 'editor' ? (
          <>
            <div className="w-[90%] xl:w-full h-[300px] gap-[3px] my-4 hidden lg:flex justify-center">
              <HtmlCode htmlInput={htmlCode} handleHtmlChange={(text) => setHtmlCode(text)} />
              <CssCode cssInput={cssCode} handleCssChange={(text) => setCssCode(text)} />
              <JsCode jsInput={jsCode} handleJsChange={(text) => setJsCode(text)} />
            </div>
            <div className="m-4 flex gap-4 lg:hidden justify-center">
              {['html', 'css', 'js'].map((mod, i) => (
                <div
                  className={`min-h-[10vh] border cursor-pointer rounded-lg ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
                  }`}
                  key={i}
                  onClick={() => changeFullScreenMode(mod as 'html' | 'css' | 'js')}
                >
                  <h1 className={`px-2 py-1 font-bold ${
                    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                  }`}>
                    {mod.toUpperCase()}
                  </h1>
                  <div className="p-2">
                    <p className="text-sm">Click to edit {mod.toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
        <Console consoleCode={consoleCode} handleChangeCode={(text)=>setJsCode(text)} jsCode={jsCode} runCode={runCode}/>
        )}

        <OutPut cssCode={cssCode} htmlCode={htmlCode} jsCode={jsCode} />
      </div>

      {/* Fullscreen modal */}
      <div className={`fixed z-10 top-0 left-0 h-screen w-screen bg-gray-800/80 justify-center items-center ${
        fullScreenMode === '' ? 'hidden' : 'flex'
      }`}>
        <main className={`flex p-6 rounded-lg w-[95%] sm:w-[90%] lg:w-[80%] h-[90vh] lg:h-[70vh] ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}>
          {fullScreenMode === 'html' && (
            <HtmlCode htmlInput={htmlCode} handleHtmlChange={(text) => setHtmlCode(text)} />
          )}
          {fullScreenMode === 'css' && (
            <CssCode cssInput={cssCode} handleCssChange={(text) => setCssCode(text)} />
          )}
          {fullScreenMode === 'js' && (
            <JsCode jsInput={jsCode} handleJsChange={(text) => setJsCode(text)} />
          )}
        </main>
      </div>
    </div>
  );
};

export default AllCodesEditor;
