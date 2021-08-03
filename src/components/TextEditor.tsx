import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";

const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const listener = () => {
            setEditing(false);
        }
        document.addEventListener("click", listener, {
            capture: true
        });
        return () => {
            document.removeEventListener("click", listener, {
                capture: true
            });
        }
    }, []);

    if (editing) {
        return (
            <div>
                <MDEditor />
            </div>
        )
    }

    return (
        <div onClick={() => setEditing(true)} >
            <MDEditor.Markdown source={"# Header"} />
        </div>
    );
};

export default TextEditor;