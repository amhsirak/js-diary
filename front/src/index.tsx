import ReactDOM from 'react-dom';
import "bulmaswatch/cyborg/bulmaswatch.min.css";
import CodeCell from './components/CodeCell';
import './styles/index.css';

const App = () => {
   
    return <div>
       <CodeCell />
    </div>
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);