import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import GameMistakes from '../game-mistakes/game-mistakes.jsx';
import {getStep, getMistakes} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';

const Type = {
  ARTIST: `game--artist`,
  GENRE: `game--genre`
};

/**
 * @description Компонент приложения
 * @param {Object} props игорвое время
 * @param {Number} props.gameTime игорвое время
 * @param {Number} props.errorCount допустимое количество ошибок
 * @return {WelcomeScreen}
 */
class App extends Component {
  render() {
    const {
      questions,
      step,
      mistakes,
      renderScreen
    } = this.props;
    const question = questions[step];

    return (
      <section className={`game ${question ? Type[question.type.toUpperCase()] : ``}`}>
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
          </svg>

          <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <GameMistakes mistakes={mistakes} />
        </header>

        {renderScreen(question)}
      </section>
    );
  }
}

App.propTypes = {
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  renderScreen: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    step: getStep(state),
    mistakes: getMistakes(state),
    questions: getQuestions(state)
  });
};

export {App};

export default connect(mapStateToProps)(App);
