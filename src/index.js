import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {reducer} from './reducers/reducer';
import Provider from 'react-redux';
import App from './components/app/app.jsx';
import settings, {questions} from './mocks/questions';

const store = createStore(reducer);

const init = (gameSettings, gameQuestions) => {
  ReactDOM.render(
      <Provider store={store}>
        <App
          time={gameSettings.gameTime}
          errorCount={gameSettings.errorCount}
          questions={gameQuestions}
        />
      </Provider>,
      document.querySelector(`.main`)
  );
};

init(settings, questions);
