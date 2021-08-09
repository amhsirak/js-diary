import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    let child:JSX.Element; 
    if (cell.type === "code") {
        child = <CodeCell />
    } else {
        child = <TextEditor />
    }
    return <div>
        {child}
    </div>
};
export default CellListItem;