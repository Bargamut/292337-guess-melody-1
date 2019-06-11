import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GenreQuestionScreen extends PureComponent {
  render() {
    const {
      question,
      renderAnswer,
      onChange,
      onAnswer,
      userAnswer
    } = this.props;

    const {
      answers,
      genre,
    } = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={(evt) => {
          evt.preventDefault();

          onAnswer();
        }}>
          {answers.map(
          // CHECK: я бы вынес то что рендеришь в компоненту отдельно
              (it, i) => {
                const key = `answer-${i}`;

                return (
                  <div className="track" key={key}>
                    {renderAnswer(it, key)}

                    <div className="game__answer">
                      <input
                        className="game__input visually-hidden"
                        type="checkbox"
                        name="answer"
                        value={key}
                        id={key}
                        onChange={() => {
                          onChange(i);
                        }}
                        checked={userAnswer[i]}
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
  renderAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.arrayOf(PropTypes.bool).isRequired
};

export default GenreQuestionScreen;
