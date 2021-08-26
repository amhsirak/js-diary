import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { saveCellMiddleware } from './middlewares/savecell-middleware';

export const store = createStore(reducers, {}, applyMiddleware(saveCellMiddleware,thunk));

