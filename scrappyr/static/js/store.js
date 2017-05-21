import { createStore, compose } from 'redux';

import rootReducer from './reducers/index';

const defaultState = {
    scraps: [],
}

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(rootReducer, defaultState, enhancers);

export default store;
