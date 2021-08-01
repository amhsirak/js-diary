import "bulmaswatch/nuclear/bulmaswatch.min.css";
import { useState } from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './components/CodeEditor';
import Preview from "./components/Preview";
import bundle from "./bundler/index";

const App = () => {
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


ReactDOM.render(
    <App />,
    document.querySelector('#root')
);