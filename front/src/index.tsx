import ReactDOM from 'react-dom';
import "bulmaswatch/nuclear/bulmaswatch.min.css";
import CodeCell from './components/CodeCell';

const App = () => {
   
    return <div>
       <CodeCell />
    </div>
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);