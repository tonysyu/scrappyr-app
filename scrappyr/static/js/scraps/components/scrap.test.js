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
  const component = ReactTestUtils.renderIntoDocument(
    <Scrap scrap={scrap} openScrapEditor={() => {}} />
  );
  const title = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'h4')

  expect(title.className).toBe('card-title');
  expect(title.innerHTML).toBe('Hello')
});
