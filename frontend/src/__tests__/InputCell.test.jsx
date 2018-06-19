import React from 'react';
import renderer from 'react-test-renderer';
import InputCell from '../InputCell';

test('Create an InputCell', () => {
  const tree = renderer.create(<InputCell/>).toJSON();
  expect(tree).toMatchSnapshot();
});
