import React from 'react';
import renderer from 'react-test-renderer';
import Board from '../Board';

test('Create a Board', () => {
  const board = renderer.create(<Board/>);
  let tree = board.toJSON();
  expect(tree).toMatchSnapshot();
});
