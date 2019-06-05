import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import {reducer} from './reducers/reducer';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';
import settings, {questions} from './mocks/questions';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const AppWrapped = withScreenSwitch(App);

const init = (gameSettings, gameQuestions) => {
  ReactDOM.render(
      <Provider store={store}>
        <AppWrapped
          time={gameSettings.gameTime}
          errorCount={gameSettings.errorCount}
          questions={gameQuestions}
        />
      </Provider>,
      document.querySelector(`.main`)
  );
};

init(settings, questions);
