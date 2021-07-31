import "./CodeEditor.css";
import { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";


interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
       editorRef.current = monacoEditor;
       monacoEditor.onDidChangeModelContent(() => {
           onChange(getValue());
       });
       monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
    };

    const onFormat = () => {
        // get current value from editor
        const unformatted = editorRef.current.getModel().getValue();
        // format that value
        const formatted = prettier.format(unformatted, {
            parser: "babel",
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, ""); // regex: finds a new line character at the end of a string
        // set the formatted value back to the editor
        editorRef.current.setValue(formatted);
    }

    return(
    <div className="editor">
        <button 
        className="button button-format is-primary is-outlined is-small" 
        onClick={onFormat}>Format</button>
    <MonacoEditor
    editorDidMount={onEditorDidMount}
    value={initialValue}
    language="javascript"
    height="400px"
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
    />
    </div>
    )
}

export default CodeEditor; 