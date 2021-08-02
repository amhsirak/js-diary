import { useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler/index";
import Resizable from "./Resizable";

const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  // Code transpiling and bundling
  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div style={{height: "100%", display: "flex", flexDirection: "row"}}>
        <CodeEditor
          initialValue="// Start writing code here!"
          onChange={(value) => setInput(value)}
        />
        
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
