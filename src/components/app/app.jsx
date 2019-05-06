import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

/**
 * @description Компонент приложения
 * @param {Object} props игорвое время
 * @param {Number} props.gameTime игорвое время
 * @param {Number} props.errorCount допустимое количество ошибок
 * @return {WelcomeScreen}
 */
const App = (props) => {
  const {time: gameTime, errorCount, onClickStartBtn} = props;

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
    onClickStartBtn={onClickStartBtn}
  />;
};

App.propTypes = {
  time: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  onClickStartBtn: PropTypes.func.isRequired
};

export default App;
