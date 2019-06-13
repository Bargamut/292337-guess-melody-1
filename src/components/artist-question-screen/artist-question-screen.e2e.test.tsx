import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from './artist-question-screen.js';

configure({adapter: new Adapter()});

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
  handleChange: jest.fn()
};

it(`Form does not send by submit answer`, () => {
  const {
    question,
    handleChange,
    preventFormSending
  } = mock;

  const artistQuestionScreen = shallow(
      <ArtistQuestionScreen
        question={question}
        onAnswer={handleChange}
        renderAnswer={jest.fn()}
      />
  );

  const answerInput = artistQuestionScreen.find(`#answer-0`);
  answerInput.simulate(`change`, {preventDefault: preventFormSending});

  expect(handleChange).toHaveBeenCalledTimes(1);

  expect(handleChange).toHaveBeenCalledWith({
    artist: `Пелагея`,
    picture: ``
  });
});
