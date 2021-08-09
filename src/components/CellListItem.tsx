import { Cell } from "../state";

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    return <div>
        {cell.id}
    </div>
};
export default CellListItem;