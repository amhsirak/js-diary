import { useEffect } from "react";
import "../styles/CodeCell.css";
import CodeEditor from "./CodeEditor";
import Resizable from "./Resizable";
import Preview from "./Preview";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id])
  // console.log(bundle);

  useEffect(() => {
    const timer = setTimeout(async() => {
       // Code transpiling and bundling
       createBundle(cell.id, cell.content)
    },800);

    return () => {
      clearTimeout(timer);
    }

  },[cell.content, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="resizable-horizontal">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue= {cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        { bundle && <Preview code={bundle.code} err={bundle.err} /> }
      </div>
    </Resizable>
  );
};

export default CodeCell;

// Debouncing? - We allow some fxn / code to run as much as possible and only after some period of time elapses, we want to perform some other action.