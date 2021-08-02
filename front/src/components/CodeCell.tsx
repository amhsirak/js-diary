import { useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from "./Preview";
import bundle from "../bundler/index";

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
        
        // Code transpiling and bundling
        const onClick = async () => {
            const output = await bundle(input);
            setCode(output);
        }
        

    return <div>
        <CodeEditor 
        initialValue="// Start writing code here!"
        onChange={(value) => setInput(value)} 
        />
        <div>
            <button onClick= {onClick}>Submit</button>
        </div>
        <Preview code={code} />
    </div>
};


export default CodeCell;