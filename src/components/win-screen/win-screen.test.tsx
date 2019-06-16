import * as React from 'react';
import * as renderer from 'react-test-renderer';

import WinScreen from './win-screen';

it(`Should render correctly`, () => {
  const gameWinScreen = renderer.create(
      <WinScreen onReplayBtnClick={jest.fn()} />
  );

  expect(gameWinScreen).toMatchSnapshot();
});
