/* eslint-disable no-case-declarations */
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
      addToScrapBook(action.scrap, action.scrapbook_id);
      return state;
    default:
      return state;
  }
}


const defaultHeader = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),
  },
};


async function fetchScrapDetail(method, scrap, ) {
  const response = await fetch(
    `/api/scraps/${scrap.id}/`,
    { ...defaultHeader,
      method: method,
      body: JSON.stringify(scrap),
    },
  );
  return response;
}

async function updateScrap(scrap) {
  const response = await fetchScrapDetail('put', scrap)
  const newScrap = await response.json();
  store.dispatch(actionCreators.receiveSingleScrap(newScrap));
}

async function deleteScrap(scrap) {
  const response = await fetchScrapDetail('delete', scrap);
  if (response.ok) {
    store.dispatch(actionCreators.removeScrap(scrap));
  }
}

async function addToScrapBook(scrap, scrapbook_id) {
  const response = await fetch(
    `/api/scrapbooks/${scrapbook_id}/scrap/${scrap.id}/`,
    { ...defaultHeader, method: 'POST' },
  );
  if (response.ok) {
    console.log('Scrap added to scrapbook (FIXME: change this to user-displayed message)');
  }
}

const rootReducer = combineReducers({
  scrapEditor,
  scraps,
  routing: routerReducer,
});

export default rootReducer;
