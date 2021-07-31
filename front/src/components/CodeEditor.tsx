import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
       monacoEditor.onDidChangeModelContent(() => {
           onChange(getValue());
       });
       monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
    };

    return <MonacoEditor
    editorDidMount={onEditorDidMount}
    value={initialValue}
    language="javascript"
    height="500px"
    theme="dark" 
    options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 18,
        scrollBeyondLastLine: false,
        automaticLayout: true
    }}
    />;
}

export default CodeEditor;