import ReactDOM from "react-dom";
import "bulmaswatch/cyborg/bulmaswatch.min.css";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/CellList";

const App = () => {
  return (
    <Provider store={store}>
    <div>
      <CellList />
    </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
