import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen.jsx';

const mock = {
  question: {
    type: `artist`,
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
