import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import WelcomeScreen from './welcome-screen';

Enzyme.configure({adapter: new Adapter()});

it(`Start button click callback runs`, () => {
  const clickHandler = jest.fn();

  const welcomeScreen = Enzyme.shallow(
      <WelcomeScreen
        time={0}
        errorCount={0}
        onClickStartBtn={clickHandler}
      />
  );

  const startButton = welcomeScreen.find(`button`);

  expect(startButton.length).toEqual(1);

  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
