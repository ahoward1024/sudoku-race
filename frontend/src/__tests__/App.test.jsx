import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

test('Create an App', () => {
  const app = renderer.create(<App/>);
  let tree = app.toJSON();
  expect(tree).toMatchSnapshot();
});
