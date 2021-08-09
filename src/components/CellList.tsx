import { useTypedSelector } from "../hooks/use-typed-selector";

const CellList: React.FC  = () => {
    const cells = useTypedSelector(({ cells: { order, data }}) => {
        return order.map((id) => {
            return data[id];
        });
    })
    return <div>
        I am cell list 
    </div>
};
export default CellList;