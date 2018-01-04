/* eslint-disable no-console */
import { getCookie } from './browser_utils';


const defaultHeader = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),
  },
};


export async function fetchScrapDetail(method, scrap, ) {
  const response = await fetch(
    `/api/scraps/${scrap.id}/`,
    { ...defaultHeader,
      method: method,
      body: JSON.stringify(scrap),
    },
  );
  return response;
}

export async function addToScrapBook(scrap, scrapbook_id) {
  const response = await fetch(
    `/api/scrapbooks/${scrapbook_id}/scrap/${scrap.id}/`,
    { ...defaultHeader, method: 'POST' },
  );
  if (response.ok) {
    console.log('Scrap added to scrapbook (FIXME: change this to user-displayed message)');
  }
}
