import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {
    createStateSyncMiddleware,
    initStateWithPrevTab,
} from 'redux-state-sync';

import rootReducer from './reducers';

const createStateSync = createStateSyncMiddleware({});

// const middleware = [thunk, logger, createStateSync];
const middleware = [thunk, logger, createStateSync];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

initStateWithPrevTab(store);

export default store;
