import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { saveCellMiddleware } from './middlewares/savecell-middleware';
import { ActionType } from "./action-types";

export const store = createStore(reducers, {}, applyMiddleware(saveCellMiddleware,thunk));

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code',
    },
});