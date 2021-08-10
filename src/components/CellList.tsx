import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });

  const renderedCells = cells.map((cell) => 
  <>
  <AddCell nextCellId={cell.id} />
  <CellListItem key={cell.id} cell={cell} />
  </>
  );

  return <div>
    {renderedCells}
    <AddCell nextCellId={null} />
  </div>;
};
export default CellList;
