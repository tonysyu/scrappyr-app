import React from 'react'; // eslint-disable-line no-unused-vars
import ReactTestUtils from 'react-dom/test-utils';

import ScrapEditor from './scrap_editor';


test('scrap title', function () {
  const editor = getScrapEditor({raw_title: '*Hello*'});
  expect(editor.refs.title.value).toBe('*Hello*')
});


test('submit', function () {
  const updateScrap = jest.fn();
  const closeScrapEditor = jest.fn();
  const editor = getScrapEditor({raw_title: '*Hello*'}, { updateScrap, closeScrapEditor });

  editor.handleSubmit({ preventDefault: () => {} });

  expect(updateScrap.mock.calls.length).toBe(1)
  expect(closeScrapEditor.mock.calls.length).toBe(1)
});


test('delete', function () {
  const deleteScrap = jest.fn();
  const closeScrapEditor = jest.fn();
  const editor = getScrapEditor({raw_title: '*Hello*'}, { deleteScrap, closeScrapEditor });

  editor.deleteScrap();

  expect(deleteScrap.mock.calls.length).toBe(1)
  expect(closeScrapEditor.mock.calls.length).toBe(1)
});


function getScrapEditor(scrap, additionalProps = {}) {
  const props = { scrapEditor: { scrap }, ...additionalProps };
  const component = ReactTestUtils.renderIntoDocument(
    <ScrapEditor {...props} />
  );
  // return ReactTestAdditions.find(component, '#scrap-editor')[0];
  return component;
}
