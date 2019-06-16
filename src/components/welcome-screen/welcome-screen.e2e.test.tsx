import * as React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Start button click callback runs`, () => {
  const clickHandler = jest.fn();

  const welcomeScreen = shallow(
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
