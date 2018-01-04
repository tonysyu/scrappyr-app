/* eslint-disable no-case-declarations */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import store from '../store';
import * as api from '../../utils/api_gateway';
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
    case 'REMOVE_SCRAP':
      return state.filter(s => s.id !== action.scrap.id);
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
        scrap: null,
        index: null,
      };
    case 'UPDATE_SCRAP':
      updateScrap(action.scrap);
      return state;
    case 'DELETE_SCRAP':
      deleteScrap(action.scrap);
      return state;
    case 'ADD_TO_SCRAPBOOK':
      api.addToScrapBook(action.scrap, action.scrapbook_id);
      return state;
    default:
      return state;
  }
}

async function updateScrap(scrap) {
  const response = await api.fetchScrapDetail('put', scrap);
  const newScrap = await response.json();
  store.dispatch(actionCreators.receiveSingleScrap(newScrap));
}

async function deleteScrap(scrap) {
  const response = await api.fetchScrapDetail('delete', scrap);
  if (response.ok) {
    store.dispatch(actionCreators.removeScrap(scrap));
  }
}

const rootReducer = combineReducers({
  scrapEditor,
  scraps,
  routing: routerReducer,
});

export default rootReducer;
