import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const settings = {
    gameTime: 5,
    errorCount: 3,
    onClickStartBtn: () => {}
  };

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
