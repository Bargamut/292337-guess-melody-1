import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import {createStore, applyMiddleware} from 'redux';
import {reducer, Operation} from './reducers/reducer';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';

const settings = {
  gameTime: 5,
  errorCount: 3
};

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const AppWrapped = withScreenSwitch(App);

const init = (gameSettings) => {
  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(
      <Provider store={store}>
        <AppWrapped
          time={gameSettings.gameTime}
          errorCount={gameSettings.errorCount}
        />
      </Provider>,
      document.querySelector(`.main`)
  );
};

init(settings);
