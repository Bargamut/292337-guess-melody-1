import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import WelcomeScreen from './components/welcome-screen/welcome-screen.jsx';


/**
 * @description Компонент приложения
 * @param {Object} props игорвое время
 * @param {Number} props.gameTime игорвое время
 * @param {Number} props.errorCount допустимое количество ошибок
 * @return {WelcomeScreen}
 */
const App = (props) => {
  const {time: gameTime, errorCount} = props;

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
  />;
};

App.propTypes = {
  time: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired
};

const init = () => {
  const settings = {
    gameTime: 5,
    errorCount: 3
  };

  ReactDOM.render(
      <App
        time={settings.gameTime}
        errorCount={settings.errorCount}
      />,
      document.querySelector(`.main`)
  );
};

init();