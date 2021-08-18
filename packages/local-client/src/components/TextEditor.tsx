import MDEditor from "@uiw/react-md-editor";
import "../styles/TextEditor.css";
import { useState, useRef, useEffect } from "react";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        // console.log("Element inside editor");
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, {
      capture: true,
    });
    return () => {
      document.removeEventListener("click", listener, {
        capture: true,
      });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
