export function receiveScraps(scraps) {
  return {
    type: 'RECEIVE_SCRAPS',
    scraps: scraps,
  };
}

export function openScrapEditor(scrap, index) {
  return {
    type: 'OPEN_EDITOR',
    scrap: scrap,
    index: index,
  };
}

export function closeScrapEditor(scrap, index) {
  return {
    type: 'CLOSE_EDITOR',
    scrap: scrap,
    index: index,
  };
}
