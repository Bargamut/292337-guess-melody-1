import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from './app.jsx';

configure({adapter: new Adapter()});

const mock = {
  questions: [
    {
      type: `genre`,
      genre: `indie-rock`,
      answers: [
        {
          genre: `indie-rock`,
          src: ``
        }
      ]
    },
    {
      type: `artist`,
      song: {
        artist: `Пелагея`,
        src: ``
      },
      answers: [
        {
          artist: `Пелагея`,
          photo: ``
        }
      ]
    }
  ]
};

it(`On click to WelcomeScreen App switches to the first question`, () => {
  const {questions} = mock;

  const app = mount(
      <App
        time={0}
        errorCount={0}
        questions={questions}
        step={-1}
        mistakes={0}
        onUserAnswer={jest.fn()}
      />
  );

  const button = app.find(`button`);
  button.simulate(`click`);
  app.update();

  expect(app.prop(`step`)).toEqual(0);

  const title = app.find(`.game__title`);
  expect(title).toHaveLength(1);
  expect(title.text().indexOf(`indie-rock`)).toBeGreaterThanOrEqual(0);
});

it(`Switches to another question`, () => {
  const {questions} = mock;

  const app = mount(
      <App
        time={0}
        errorCount={0}
        questions={questions}
        step={-1}
        mistakes={0}
        onUserAnswer={jest.fn()}
      />
  );

  app.setProps({step: 0});
  app.update();

  const form = app.find(`form`);
  form.simulate(`submit`, {
    preventDefault() {}
  });
  app.update();

  expect(app.prop(`step`)).toEqual(1);

  let title = app.find(`.game__title`);
  expect(title).toHaveLength(1);
  expect(title.text().indexOf(`Кто исполняет эту песню?`)).toBeGreaterThanOrEqual(0);
});

it(`Switches to Welcome Screen after last question`, () => {
  const {questions} = mock;

  const app = mount(
      <App
        time={0}
        errorCount={0}
        questions={questions}
        step={-1}
        mistakes={0}
        onUserAnswer={jest.fn()}
      />
  );

  app.setProps({step: questions.length - 1});
  app.update();

  const answerInput = app.find(`#answer-0`);
  answerInput.simulate(`change`, {
    preventDefault() {}
  });
  app.update();

  expect(app.prop(`step`)).toEqual(-1);

  let welcomeSection = app.find(`.welcome`);
  expect(welcomeSection).toHaveLength(1);
});
