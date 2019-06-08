import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen.jsx';

it(`Authorization Screen renders correctly`, () => {
  const authorizationScreen = renderer.create(
      <AuthorizationScreen
        onInputChange={jest.fn()}
        onReplaybtnClick={jest.fn()}
        onFormSubmit={jest.fn()}
        isSubmitDisabled={true}
      />
  ).toJSON();

  expect(authorizationScreen).toMatchSnapshot();
});
