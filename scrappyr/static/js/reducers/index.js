import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


function scraps(state = [], action) {
    switch (action.type) {
        case 'RECEIVE_SCRAPS':
            return action.scraps;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    scraps,
    routing: routerReducer,
});

export default rootReducer;
