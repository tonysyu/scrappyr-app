import React from 'react';

function helloWorld() {
  return 'Hello world!';
}

test('Hello world', function () {
  it('says hello', function () {
    expect(helloWorld()).toBe('Hello world!');
  });
});
