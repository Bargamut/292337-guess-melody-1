import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from './artist-question-screen.jsx';

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
        photo: ``
      },
      {
        artist: `Краснознаменная дивизия имени моей бабушки`,
        photo: ``
      },
      {
        artist: `Lorde`,
        photo: ``
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
      />
  );

  const form = artistQuestionScreen.find(`form`);
  form.simulate(`change`, {preventDefault: preventFormSending});

  expect(handleChange).toHaveBeenCalledTimes(1);
});
