import ReactDOM from "react-dom";
import "bulmaswatch/cyborg/bulmaswatch.min.css";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./state";
import TextEditor from "./components/TextEditor";

const App = () => {
  return (
    <Provider store={store}>
    <div>
      <TextEditor />
    </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
