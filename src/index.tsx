import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import history from './history';
import {Router} from 'react-router-dom';

import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer/reducer';

import {Operation} from './reducer/data/data';
import {Provider} from 'react-redux';
import {createAPI} from './api';

import App from './components/app/app';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';

const settings = {
  gameTime: 5,
  errorCount: 3
};

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const AppWrapped = withScreenSwitch(App);

const init = (gameSettings) => {
  const api = createAPI(() => history.push(`/login`));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          __REDUX_DEVTOOLS_EXTENSION__
            ? __REDUX_DEVTOOLS_EXTENSION__()
            : (a) => a
      )
  );

  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <AppWrapped
            time={gameSettings.gameTime}
            errorCount={gameSettings.errorCount}
          />
        </Router>
      </Provider>,
      document.querySelector(`.main`)
  );
};

init(settings);
