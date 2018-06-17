import React from 'react';
import {shallow} from 'enzyme';
import Board from '../Board';
import renderer from 'react-test-renderer';

test('Test the Board component', () => {
  const tree = renderer.create(<Board width="400" height="400"/>).component.toJSON();
  expect(tree).toMatchSnapshot();
});
