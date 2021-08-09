import { useState, useEffect } from "react";
import "../styles/CodeCell.css";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler/index";
import Resizable from "./Resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async() => {
       // Code transpiling and bundling
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    },1000);

    return () => {
      clearTimeout(timer);
    }

  },[cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="resizable-horizontal">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue= {cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;

// Debouncing? - When we allow some fxn / code to run as much as possible and only after some period of time elapses, we want to perform some other action.