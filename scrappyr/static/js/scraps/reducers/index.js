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

function scrapEditor(state = [], action) {
  switch (action.type) {
    case 'OPEN_EDITOR':
      return {
        ...state,
        isOpen: true,
        scrap: action.scrap,
        index: action.index,
      };
    case 'CLOSE_EDITOR':
      return {
        ...state,
        isOpen: false,
        scrap: action.scrap,
        index: action.index,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  scrapEditor,
  scraps,
  routing: routerReducer,
});

export default rootReducer;
