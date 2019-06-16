import * as React from 'react';
import * as renderer from 'react-test-renderer';

import GameOverScreen from './game-over-screen';

it(`Should render correctly`, () => {
  const gameOverScreen = renderer.create(
      <GameOverScreen onReplayBtnClick={jest.fn()} />
  );

  expect(gameOverScreen).toMatchSnapshot();
});
