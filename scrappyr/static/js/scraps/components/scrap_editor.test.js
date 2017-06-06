import React from 'react'; // eslint-disable-line no-unused-vars
import ReactTestUtils from 'react-dom/test-utils';

import ScrapEditor from './scrap_editor';


test('scrap title', function () {
  const editor = getScrapEditor({raw_title: '*Hello*'});
  expect(editor.refs.title.value).toBe('*Hello*');
});


test('handleSubmit', function () {
  const scrap = { raw_title: 'test-title' };
  const updateScrap = jest.fn();
  const closeScrapEditor = jest.fn();
  const editor = getScrapEditor(scrap, { updateScrap, closeScrapEditor });

  editor.handleSubmit({ preventDefault: () => {} });

  expect(updateScrap.mock.calls.length).toBe(1);
  expect(updateScrap.mock.calls[0][0]).toEqual(scrap);
  expect(closeScrapEditor.mock.calls.length).toBe(1);
});


test('handleSubmit with updated title', function () {
  const scrap = { raw_title: 'original-title' };
  const updateScrap = jest.fn();
  const editor = getScrapEditor(scrap, { updateScrap, closeScrapEditor: jest.fn() });

  editor.refs.title.value = 'new-title';
  editor.handleSubmit({ preventDefault: () => {} });

  expect(updateScrap.mock.calls[0][0]).toEqual({ raw_title: 'new-title' });
});


test('deleteScrap', function () {
  const scrap = { id: 42 };
  const deleteScrap = jest.fn();
  const closeScrapEditor = jest.fn();
  const editor = getScrapEditor(scrap, { deleteScrap, closeScrapEditor });

  editor.deleteScrap();

  expect(deleteScrap.mock.calls.length).toBe(1);
  expect(deleteScrap.mock.calls[0][0]).toEqual(scrap);
  expect(closeScrapEditor.mock.calls.length).toBe(1);
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
