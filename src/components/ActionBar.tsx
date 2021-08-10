import "../styles/ActionBar.css";
import { useActions } from "../hooks/use-actions";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <button className="button is-warning is-small" onClick={() => moveCell(id, "up")}>
        <span className="icon">
          <i className="fas fa-chevron-up" />
        </span>
      </button>
      <button className="button is-warning is-small" onClick={() => moveCell(id, "down")}>
        <span className="icon">
            <i className="fas fa-chevron-down" />
        </span>
      </button>
      <button className="button is-warning is-small" onClick={() => deleteCell(id)}>
        <span className="icon">
            <i className="fas fa-trash-alt" />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
