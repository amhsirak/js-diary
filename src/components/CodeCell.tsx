import { useState, useEffect } from "react";
import "../styles/CodeCell.css";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler/index";
import Resizable from "./Resizable";

const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const timer = setTimeout( async() => {
       // Code transpiling and bundling
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    },1000);

    return () => {
      clearTimeout(timer);
    }

  },[input]);

  return (
    <Resizable direction="vertical">
      <div className="resizable-horizontal">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="// Start writing code here!"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;

// Debouncing? - When we allow some fxn / code to run as much as possible and only after some period of time elapses, we want to perform some other action.