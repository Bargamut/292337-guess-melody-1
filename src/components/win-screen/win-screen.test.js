import React from 'react';
import renderer from 'react-test-renderer';
import WinScreen from './win-screen.jsx';

it(`Should render correctly`, () => {
  const gameWinScreen = renderer.create(
      <WinScreen onReplayBtnClick={jest.fn()} />
  );

  expect(gameWinScreen).toMatchSnapshot();
});
