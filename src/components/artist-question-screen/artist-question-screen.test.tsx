import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Type } from '../../types';
import ArtistQuestionScreen from './artist-question-screen';

const mock = {
  question: {
    type: Type.ARTIST,
    song: {
      artist: `Пелагея`,
      src: ``
    },
    answers: [
      {
        artist: `Пелагея`,
        picture: ``
      },
      {
        artist: `Краснознаменная дивизия имени моей бабушки`,
        picture: ``
      },
      {
        artist: `Lorde`,
        picture: ``
      }
    ]
  },
  handleSubmit: jest.fn()
};

it(`Artist Question Screen renders correctly`, () => {
  const {
    question,
    handleSubmit
  } = mock;

  const artistQuestionScreen = renderer.create(
      <ArtistQuestionScreen
        question={question}
        onAnswer={handleSubmit}
        renderAnswer={jest.fn()}
      />,
      {
        createNodeMock: (element) => {
          if (element.type === `audio`) {
            return {
              src: ``
            };
          }

          return null;
        }
      }
  ).toJSON();

  expect(artistQuestionScreen).toMatchSnapshot();
});
