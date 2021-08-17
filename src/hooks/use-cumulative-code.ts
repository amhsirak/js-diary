import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
    return useTypedSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map(id => data[id]);
        const displayFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var display = (value) => {
          const root = document.querySelector("#root");
          if (typeof value === "object") {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            } else {
            root.innerHTML = JSON.stringify(value);
            } 
          } else {
           root.innerHTML = value;
          }
        }
        `;
        const displayFuncNoOp = 'var display = () => {}';
        const cumulativeCode = [];
        for (let c of orderedCells) {
          if (c.type === "code") {
            if (c.id === cellId) {
              cumulativeCode.push(displayFunc);
            } else {
              cumulativeCode.push(displayFuncNoOp);
            }
            cumulativeCode.push(c.content);
          }
          if (c.id === cellId) {
            break;
          }
        }
        return cumulativeCode;
      }).join("\n");
    
      // console.log(cumulativeCode);
};