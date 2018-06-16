import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';
import renderer from 'react-test-renderer';

test('Test the full App function', () => {
  const component = renderer.create(
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
