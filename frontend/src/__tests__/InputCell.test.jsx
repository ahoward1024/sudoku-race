import React from 'react';
import renderer from 'react-test-renderer';
import InputCell from '../InputCell';

test('Create an InputCell', () => {
  const inputCell = renderer.create(<InputCell/>);
  let tree = inputCell.toJSON();
  expect(tree).toMatchSnapshot();
});
