import MDEditor from "@uiw/react-md-editor";
import "../styles/TextEditor.css";
import { useState, useRef, useEffect } from "react";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("# Header");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        console.log("Element inside editor");
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
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
