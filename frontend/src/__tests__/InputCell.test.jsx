import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputCell from '../InputCell';
import sinon from 'sinon';

Enzyme.configure({'adapter': new Adapter()});

test('Create an InputCell', () => {
  const tree = renderer.create(<InputCell/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test if the sent keypress was not a number', () => {
  // Test case for keycode 100: d should return false
  const event = new KeyboardEvent('keydown', {'keyCode': 100}),
        result = shallow(<InputCell/>).instance()
                 .isNumber(event);
  document.dispatchEvent(event);
  expect(result).toBe(false);
});

test('Test if the sent keypress was a number', () => {
  // Test case for keycode 50: 2 should return true
  const event = new KeyboardEvent('keydown', {'keyCode': 50}),
        result = shallow(<InputCell/>).instance()
                 .isNumber(event);
  document.dispatchEvent(event);
  expect(result).toBe(true);
});
