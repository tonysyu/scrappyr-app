export function receiveScraps(scraps) {
  return {
    type: 'RECEIVE_SCRAPS',
    scraps: scraps,
  };
}

export function openEditor() {
  return {
    type: 'OPEN_EDITOR',
  };
}

export function closeEditor() {
  return {
    type: 'CLOSE_EDITOR',
  };
}
