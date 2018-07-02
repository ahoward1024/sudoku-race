import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

test('Create an App', async () => {
  const tree = await renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
});
