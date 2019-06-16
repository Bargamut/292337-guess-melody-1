import * as React from 'react';
import * as renderer from 'react-test-renderer';

import GameMistakes from './game-mistakes';

it(`Game Mistakes renders without mistakes`, () => {
  const gameMistakes = renderer.create(<GameMistakes mistakes={0} />);

  expect(gameMistakes).toMatchSnapshot();
});

it(`Game Mistakes renders with 3 mistakes`, () => {
  const gameMistakes = renderer.create(<GameMistakes mistakes={3} />);

  expect(gameMistakes).toMatchSnapshot();
});
