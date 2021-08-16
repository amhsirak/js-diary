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
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);
    const cumulativeCode = [
      `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      const display = (value) => {
        const root = document.querySelector("#root");
        if (typeof value === "object") {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          }
          root.innerHTML = JSON.stringify(value);
        } else {
         root.innerHTML = value;
        }
      }
      `
    ];
    for (let c of orderedCells) {
      if (c.type === "code") {
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  // console.log(cumulativeCode);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join("\n"));
      return;
    }
    const timer = setTimeout(async() => {
       // Code transpiling and bundling
       createBundle(cell.id, cumulativeCode.join("\n"));
    },800);

    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[cumulativeCode.join("\n"), cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="resizable-horizontal">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue= {cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
        {
          !bundle || bundle.loading ? (
           <div className="progress-cover">
            <progress className="progress is-small is-primary" max="100">
              Loading
            </progress>
          </div>
          ) : ( 
            <Preview code={bundle.code} err={bundle.err} /> 
            )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;

// Debouncing? - We allow some fxn / code to run as much as possible and only after some period of time elapses, we want to perform some other action.