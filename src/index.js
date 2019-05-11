import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import settings, {questions} from './mocks/questions';

const init = () => {
  ReactDOM.render(
      <App
        time={settings.gameTime}
        errorCount={settings.errorCount}
        onClickStartBtn={settings.onClickStartBtn}
      />,
      document.querySelector(`.main`)
  );
};

init();
