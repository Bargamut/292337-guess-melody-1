import * as React from 'react';
import * as renderer from 'react-test-renderer';

import AuthorizationScreen from './authorization-screen';

it(`Authorization Screen renders correctly`, () => {
  const authorizationScreen = renderer.create(
      <AuthorizationScreen
        onInputChange={jest.fn()}
        onReplayBtnClick={jest.fn()}
        onFormSubmit={jest.fn()}
        isSubmitDisabled={true}
      />
  ).toJSON();

  expect(authorizationScreen).toMatchSnapshot();
});
