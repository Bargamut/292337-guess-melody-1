import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import history from './history';

import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer/reducer';
import {Operation} from './reducer/data/data';
import {Provider} from 'react-redux';
import {createAPI} from './api';

import App from './components/app/app.jsx';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';

const settings = {
  gameTime: 5,
  errorCount: 3
};

const AppWrapped = withScreenSwitch(App);

const init = (gameSettings) => {
  const api = createAPI(() => history.push(`/login`));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (a) => a
      )
  );

  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <AppWrapped
            time={gameSettings.gameTime}
            errorCount={gameSettings.errorCount}
          />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`.main`)
  );
};

init(settings);
