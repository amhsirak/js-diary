import "./Resizable.css";
import { ResizableBox } from "react-resizable";

interface ResizableProps {
    direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    return(
        <ResizableBox 
        height={300} 
        width={300}
        resizeHandles={["s"]}
        >
           {children} 
        </ResizableBox>
    )
}

export default Resizable;