import React from 'react'; // eslint-disable-line no-unused-vars
import ReactTestUtils from 'react-dom/test-utils';

import ScrapEditor from './scrap_editor';


test('scrap title', function () {
  const editor = getScrapEditor({raw_title: '*Hello*'});
  expect(editor.refs.title.value).toBe('*Hello*')
});


function getScrapEditor(scrap) {
  const props = { scrapEditor: { scrap } };
  const component = ReactTestUtils.renderIntoDocument(
    <ScrapEditor {...props} />
  );
  // return ReactTestAdditions.find(component, '#scrap-editor')[0];
  return component;
}
