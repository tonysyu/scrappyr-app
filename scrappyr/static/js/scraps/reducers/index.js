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

function app(state = [], action) {
  switch (action.type) {
    case 'OPEN_EDITOR':
      return {...state, isEditorOpen: true};
    case 'CLOSE_EDITOR':
      return {...state, isEditorOpen: false};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app,
  scraps,
  routing: routerReducer,
});

export default rootReducer;
