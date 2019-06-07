import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen.jsx';

it(`Authorization Screen renders correctly`, () => {
  const authorizationScreen = renderer.create(
      <AuthorizationScreen />
  ).toJSON();

  expect(authorizationScreen).toMatchSnapshot();
});
