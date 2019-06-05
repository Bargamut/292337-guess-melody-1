import React from 'react';
import renderer from 'react-test-renderer';
import GameOverScreen from './game-over-screen.jsx';

it(`Should render correctly`, () => {
  const gameOverScreen = renderer.create(
      <GameOverScreen onReplayBtnClick={jest.fn()} />
  );

  expect(gameOverScreen).toMatchSnapshot();
});
