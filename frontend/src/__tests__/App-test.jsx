import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';
import renderer from 'react-test-renderer';

test('Test the full App function', () => {
  const tree = renderer.create().component.toJSON();
  expect(tree).toMatchSnapshot();
});
