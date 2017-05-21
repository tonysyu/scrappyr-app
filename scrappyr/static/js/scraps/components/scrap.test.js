import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReactTestUtils from 'react-dom/test-utils';

import Scrap from './scrap';


function helloWorld() {
  return 'Hello world!';
}

test('render title', function () {
  const scrap = {html_title: "Hello"};
  const component = ReactTestUtils.renderIntoDocument(<Scrap scrap={scrap} />);
  const div = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'div')
  const span = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'span')
  expect(div.className).toBe('scrap');
  expect(span.className).toBe('scrap-title');
  expect(div.children[0]).toBe(span);
  expect(span.innerHTML).toBe('Hello')
});
