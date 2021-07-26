import * as esbuild from 'esbuild-wasm';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        const service = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
        console.log(service);
    };

    useEffect(() => {
        startService();
    }, []);

    const onClick = () => {
        console.log(input);
    };

    return <div>
        <textarea 
        value = {input}
        onChange={e => setInput(e.target.value)}
        />
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
    </div>
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);