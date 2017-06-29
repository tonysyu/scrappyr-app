export function receiveScraps(scraps) {
  return {
    type: 'RECEIVE_SCRAPS',
    scraps,
  };
}

export function receiveSingleScrap(scrap) {
  return {
    type: 'RECEIVE_SINGLE_SCRAP',
    scrap,
  };
}

export function updateScrap(scrap) {
  return {
    type: 'UPDATE_SCRAP',
    scrap,
  };
}

// Delete scrap permanently.
export function deleteScrap(scrap) {
  return {
    type: 'DELETE_SCRAP',
    scrap,
  };
}

// Add scrap to scrapbook
export function addToScrapBook(scrap, scrapbook_id) {
  return {
    type: 'ADD_TO_SCRAPBOOK',
    scrap,
    scrapbook_id,
  };
}

// Remove scrap from scraps list.
export function removeScrap(scrap) {
  return {
    type: 'REMOVE_SCRAP',
    scrap,
  };
}

export function openScrapEditor(scrap, index) {
  return {
    type: 'OPEN_EDITOR',
    scrap,
    index,
  };
}

export function closeScrapEditor() {
  return {
    type: 'CLOSE_EDITOR',
  };
}
