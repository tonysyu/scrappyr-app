import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReactTestUtils from 'react-dom/test-utils';

import Scrap from './scrap';


test('render title', function () {
  const title = getScrapTitleElement({html_title: 'Hello'});
  expect(title.className).toBe('card-title');
  expect(title.innerHTML).toBe('Hello')
});


test('render title with html', function () {
  const title = getScrapTitleElement({html_title: '<b>Hello</b>'});
  expect(title.className).toBe('card-title');
  expect(title.innerHTML).toBe('<b>Hello</b>')
});


function getScrapTitleElement(scrap) {
  const component = ReactTestUtils.renderIntoDocument(
    <Scrap scrap={scrap} openScrapEditor={() => {}} />
  );
  return ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h4')
}
