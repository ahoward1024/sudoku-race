import React from 'react';
import renderer from 'react-test-renderer';
import NoInputCell from '../NoInputCell';

test('Create a NoInputCell', () => {
  const noInputCell = renderer.create(<NoInputCell/>);
  let tree = noInputCell.toJSON();
  expect(tree).toMatchSnapshot();
});
