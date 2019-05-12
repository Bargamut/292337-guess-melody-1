import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import settings, {questions} from './mocks/questions';

const init = (gameSettings, gameQuestions) => {
  ReactDOM.render(
      <App
        time={gameSettings.gameTime}
        errorCount={gameSettings.errorCount}
        questions={gameQuestions}
      />,
      document.querySelector(`.main`)
  );
};

init(settings, questions);
