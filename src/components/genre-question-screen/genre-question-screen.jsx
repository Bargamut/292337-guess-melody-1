import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    const {question} = this.props;
    const {answers} = question;

    this.state = {
      userAnswer: new Array(answers.length).fill(false)
    };
  }

  render() {
    const {question, activePlayerKey, onPlayBtnClick, onAnswer} = this.props;
    const {
      answers,
      genre,
    } = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={(evt) => {
          evt.preventDefault();

          onAnswer(this.state.userAnswer);
        }}>
          {answers.map(
              (it, i) => {
                const key = `answer-${i}`;

                return (
                  <div className="track" key={key}>
                    <AudioPlayer
                      src={it.src}
                      isPlaying={key === activePlayerKey}
                      onPlayBtnClick={() => {
                        onPlayBtnClick(key);
                      }}
                    />

                    <div className="game__answer">
                      <input
                        className="game__input visually-hidden"
                        type="checkbox"
                        name="answer"
                        value={key}
                        id={key}
                        onChange={() => {
                          this._handleChange(i);
                        }}
                      />
                      <label className="game__check" htmlFor={key}>Отметить</label>
                    </div>
                  </div>
                );
              }
          )}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }

  /**
   * @description Обработчик смены отметки ответа
   * @param {Number} i Индекс ответа
   * @author Paul "Bargamut" Petrov
   * @date 2019-05-21
   * @memberof GenreQuestionScreen
   */
  _handleChange(i) {
    const userAnswer = this.state.userAnswer.slice(0);

    userAnswer[i] = !userAnswer[i];

    this.setState({userAnswer});
  }
}

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          genre: PropTypes.oneOf([`indie-rock`, `rock`, `folk-rock`]).isRequired,
          src: PropTypes.string.isRequired
        })
    ).isRequired,
    genre: PropTypes.oneOf([`indie-rock`, `rock`, `folk-rock`]).isRequired
  }).isRequired,
  activePlayerKey: (props, propName, componentName) => {
    const propValue = props[propName];

    if (propValue === null || typeof propValue === `string`) {
      return undefined;
    }

    return new Error(`${componentName} ${propName} only accepts null or string`);
  },
  onPlayBtnClick: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default GenreQuestionScreen;
