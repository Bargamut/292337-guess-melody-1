import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';

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

    this.state = {
      question: -1
    };
  }

  render() {
    const {questions} = this.props;

    return (
      <section className="game game--artist">
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
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        {this._getScreen(questions[this.state.question])}
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
          question={question}
          onAnswer={this._handleClick}
        />;
      case `artist`:
        return <ArtistQuestionScreen
          question={question}
          onAnswer={this._handleClick}
        />;
    }

    return null;
  }

  /**
   * @description Обработать клик по кнопке старта / ответу
   * @author Paul "Bargamut" Petrov
   * @date 2019-05-11
   * @memberof App
   */
  _handleClick() {
    const questionIndex = this.state.question + 1;

    if (questionIndex > this.props.questions.length) {
      questionIndex = 0;
    }

    this.setState({question: questionIndex});
  }
}

App.propTypes = {
  time: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default App;
