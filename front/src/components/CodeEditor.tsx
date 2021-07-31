import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => {
    return <MonacoEditor
    language="javascript"
    height="500px"
    theme="dark" 
    options={{
        wordWrap: "on"
    }}
    />;
}

export default CodeEditor;