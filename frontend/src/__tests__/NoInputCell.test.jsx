import React from 'react';
import renderer from 'react-test-renderer';
import NoInputCell from '../NoInputCell';

const id = '1';
const value = '1';
const cellSize = 10;
const textScale = 1.0;

test('Create a NoInputCell', () => {
  const tree = renderer.create(<NoInputCell
                               id={id}
                               value={value}
                               cellSize={cellSize}
                               textScale={textScale}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
