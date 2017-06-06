import React from 'react'; // eslint-disable-line no-unused-vars
import ReactTestUtils from 'react-dom/test-utils';

import ScrapEditor from './scrap_editor';


test('scrap title', function () {
  const editor = getScrapEditor({raw_title: '*Hello*'});
  expect(editor.refs.title.value).toBe('*Hello*')
});


test('handleSubmit', function () {
  const updateScrap = jest.fn();
  const closeScrapEditor = jest.fn();
  const editor = getScrapEditor({}, { updateScrap, closeScrapEditor });

  editor.handleSubmit({ preventDefault: () => {} });

  expect(updateScrap.mock.calls.length).toBe(1)
  expect(closeScrapEditor.mock.calls.length).toBe(1)
});


test('deleteScrap', function () {
  const deleteScrap = jest.fn();
  const closeScrapEditor = jest.fn();
  const editor = getScrapEditor({}, { deleteScrap, closeScrapEditor });

  editor.deleteScrap();

  expect(deleteScrap.mock.calls.length).toBe(1)
  expect(closeScrapEditor.mock.calls.length).toBe(1)
});


test('toggleMoreActionsDropdown', function () {
  const editor = getScrapEditor();
  expect(editor.state.moreActionsDropdownOpen).toBe(false);

  editor.toggleMoreActionsDropdown();
  expect(editor.state.moreActionsDropdownOpen).toBe(true);

  editor.toggleMoreActionsDropdown();
  expect(editor.state.moreActionsDropdownOpen).toBe(false);
});


function getScrapEditor(scrap, additionalProps = {}) {
  const props = { scrapEditor: { scrap }, ...additionalProps };
  const component = ReactTestUtils.renderIntoDocument(
    <ScrapEditor {...props} />
  );
  return component;
}
