import React from 'react';
import renderer from 'react-test-renderer';
import Board from '../Board';

test('Create a Board', () => {
  const tree = renderer.create(<Board/>).toJSON();
  expect(tree).toMatchSnapshot();
});
