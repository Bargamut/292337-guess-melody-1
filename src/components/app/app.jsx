import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreators} from '../../reducers/reducer';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';

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
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    const {questions, step, mistakes} = this.props;
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

          <div className="game__mistakes">
            {new Array(mistakes).map((it, i) => {
              return <div className="wrong" key={`wrong-answer-${i}`} />;
            })}
          </div>
        </header>

        {this._getScreen(question)}
      </section>
    );
  }

  /**
   * @description Выбрать экран для показа
   * @author Paul "Bargamut" Petrov
   * @date 2019-05-11
   * @param {Object} question
   * @return {JSXElement}
   * @memberof App
   */
  _getScreen(question) {
    if (!question) {
      const {
        time: gameTime,
        errorCount
      } = this.props;

      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onClickStartBtn={this._handleClick}
      />;
    }

    switch (question.type) {
      case `genre`:
        return <GenreQuestionScreen
          key={`genre-question-screen-${question}`}
          question={question}
          onAnswer={this._handleClick}
        />;
      case `artist`:
        return <ArtistQuestionScreen
          key={`article-question-screen-${question}`}
          question={question}
          onAnswer={this._handleClick}
        />;
    }

    return null;
  }

  /**
   * @description Обработать клик по кнопке старта / ответу
   * @param {Object} userAnswer Ответ пользователя
   * @author Paul "Bargamut" Petrov
   * @date 2019-05-12
   * @memberof App
   */
  _handleClick(userAnswer) {
    const {questions, step} = this.props;

    this.props.onUserAnswer(questions[step], userAnswer);
  }
}

App.propTypes = {
  time: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    step: state.step,
    mistakes: state.mistakes
  });
};

const mapDispatchToProps = (dispatch) => ({
  onUserAnswer: (question, userAnswer) => {
    dispatch(ActionCreators[`INCREMENT_STEP`](question, userAnswer));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
