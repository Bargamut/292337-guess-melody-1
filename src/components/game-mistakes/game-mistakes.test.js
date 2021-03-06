import React from 'react';
import renderer from 'react-test-renderer';
import GameMistakes from './game-mistakes.jsx';

it(`Game Mistakes renders without mistakes`, () => {
  const gameMistakes = renderer.create(<GameMistakes mistakes={0} />);

  expect(gameMistakes).toMatchSnapshot();
});

it(`Game Mistakes renders with 3 mistakes`, () => {
  const gameMistakes = renderer.create(<GameMistakes mistakes={3} />);

  expect(gameMistakes).toMatchSnapshot();
});
