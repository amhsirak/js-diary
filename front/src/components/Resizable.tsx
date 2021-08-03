import "../styles/Resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useState,useEffect } from "react";

interface ResizableProps {
    direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

    let resizableProps: ResizableBoxProps;
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    useEffect(() => {
        let timer: any;
        const listener = () => {
            // debouncing
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerWidth(window.innerWidth);
                setInnerHeight(window.innerHeight);
            }, 100);
        }
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        }
    },[])

    if (direction === "horizontal") {
        resizableProps = {
            className: "resize-horizontal",
            height: Infinity, 
            width: innerWidth * 0.8,
            resizeHandles: ["e"],
            minConstraints: [innerWidth * 0.1, Infinity],
            maxConstraints: [innerWidth * 0.8, Infinity],
        };
    } else {
        resizableProps = {
            height: 300, 
            width: Infinity,
            resizeHandles: ["s"],
            minConstraints: [Infinity, innerWidth * 0.1],
            maxConstraints: [Infinity, innerHeight * 0.8],
        };
    }

    return (
        <ResizableBox {...resizableProps} >
           {children} 
        </ResizableBox>
    )
}

export default Resizable;