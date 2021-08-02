import "../styles/Resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
    direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

    let resizableProps: ResizableBoxProps;
    if (direction === "horizontal") {
        resizableProps = {
            className: "resize-horizontal",
            height: Infinity, 
            width: window.innerWidth * 0.8,
            resizeHandles: ["e"],
            minConstraints: [window.innerWidth * 0.1, Infinity],
            maxConstraints: [window.innerWidth * 0.8, Infinity],
        };
    } else {
        resizableProps = {
            height: 300, 
            width: Infinity,
            resizeHandles: ["s"],
            minConstraints: [Infinity, window.innerWidth * 0.1],
            maxConstraints: [Infinity, window.innerHeight * 0.8],
        };
    }

    return (
        <ResizableBox {...resizableProps} >
           {children} 
        </ResizableBox>
    )
}

export default Resizable;