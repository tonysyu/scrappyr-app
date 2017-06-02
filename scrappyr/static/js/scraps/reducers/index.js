import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import store from '../store';
import { getCookie } from '../../utils/browser_utils';
import * as actionCreators from '../actions';


function scraps(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_SCRAPS':
      return action.scraps;
    case 'RECEIVE_SINGLE_SCRAP':
      const i = state.findIndex(scrap => scrap.id === action.scrap.id);
      return [
        ...state.slice(0, i),
        action.scrap,
        ...state.slice(i+1),
      ];
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
    case 'UPDATE_SCRAP':
      updateScrap(action.scrap);
      return state;
    default:
      return state;
  }
}


async function updateScrap(scrap) {
  const response = await fetch(
    `/api/scraps/${scrap.id}/`,
    {
      method: 'put',
      credentials: 'include',
      body: JSON.stringify(scrap),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
    },
  );
  const newScrap = await response.json();
  store.dispatch(actionCreators.receiveSingleScrap(newScrap));
}

const rootReducer = combineReducers({
  scrapEditor,
  scraps,
  routing: routerReducer,
});

export default rootReducer;