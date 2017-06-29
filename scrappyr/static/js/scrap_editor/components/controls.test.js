import React from 'react'; // eslint-disable-line no-unused-vars
import ReactTestUtils from 'react-dom/test-utils';

import ScrapControls from './controls';

test('deleteScrap', function () {
  const scrap = { id: 42 };
  const deleteScrap = jest.fn();
  const closeScrapEditor = jest.fn();
  const editor = getScrapControls(scrap, { deleteScrap, closeScrapEditor });

  editor.deleteScrap();

  expect(deleteScrap.mock.calls.length).toBe(1);
  expect(deleteScrap.mock.calls[0][0]).toEqual(scrap);
  expect(closeScrapEditor.mock.calls.length).toBe(1);
});


test('toggleMoreActionsDropdown', function () {
  const editor = getScrapControls();
  expect(editor.state.moreActionsDropdownOpen).toBe(false);

  editor.toggleMoreActionsDropdown();
  expect(editor.state.moreActionsDropdownOpen).toBe(true);

  editor.toggleMoreActionsDropdown();
  expect(editor.state.moreActionsDropdownOpen).toBe(false);
});


function getScrapControls(scrap, additionalProps = {}) {
  const props = { scrapEditor: { scrap }, ...additionalProps };
  const component = ReactTestUtils.renderIntoDocument(
    <ScrapControls {...props} />
  );
  return component;
}
