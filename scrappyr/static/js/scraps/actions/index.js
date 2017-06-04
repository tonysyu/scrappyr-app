export function receiveScraps(scraps) {
  return {
    type: 'RECEIVE_SCRAPS',
    scraps: scraps,
  };
}

export function receiveSingleScrap(scrap) {
  return {
    type: 'RECEIVE_SINGLE_SCRAP',
    scrap: scrap,
  };
}

export function updateScrap(scrap) {
  return {
    type: 'UPDATE_SCRAP',
    scrap: scrap,
  };
}

// Delete scrap permanently.
export function deleteScrap(scrap) {
  return {
    type: 'DELETE_SCRAP',
    scrap: scrap,
  };
}

// Remove scrap from scraps list.
export function removeScrap(scrap) {
  return {
    type: 'REMOVE_SCRAP',
    scrap: scrap,
  };
}

export function openScrapEditor(scrap, index) {
  return {
    type: 'OPEN_EDITOR',
    scrap: scrap,
    index: index,
  };
}

export function closeScrapEditor() {
  return {
    type: 'CLOSE_EDITOR',
  };
}
