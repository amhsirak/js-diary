import "bulmaswatch/nuclear/bulmaswatch.min.css";
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/CodeEditor';
import Preview from "./components/Preview";

const App = () => {
    const ref = useRef<any>();
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
        });

    };

    useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
        if(!ref.current) {
            return;
        }
        
        // Code transpiling and bundling
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(input)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            },
        });
        // console.log(result);
        setCode(result.outputFiles[0].text);
        
    };

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