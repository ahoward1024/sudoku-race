import React from 'react';
import renderer from 'react-test-renderer';
import NoInputCell from '../NoInputCell';

test('Create a NoInputCell', () => {
  const tree = renderer.create(<NoInputCell/>).toJSON();
  expect(tree).toMatchSnapshot();
});
