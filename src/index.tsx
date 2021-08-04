import ReactDOM from "react-dom";
import "bulmaswatch/cyborg/bulmaswatch.min.css";
// import CodeCell from "./components/CodeCell";
import "./styles/index.css";
import TextEditor from "./components/TextEditor";

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
