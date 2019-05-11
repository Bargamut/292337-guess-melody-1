import React from 'react';
import PropTypes from 'prop-types';

const GenreQuestionScreen = ({question, onAnswer}) => {
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
            (it, i) => {
              const key = `answer-${i}`;

              return (
                <div className="track" key={key}>
                  <button className="track__button track__button--play" type="button"></button>

                  <div className="track__status">
                    <audio src={it.src} />
                  </div>

                  <div className="game__answer">
                    <input className="game__input visually-hidden" type="checkbox" name="answer" value={key} id={key} />
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
};

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          genre: PropTypes.oneOf([`indie-rock`, `rock`, `folk-rock`]).isRequired,
          src: PropTypes.string.isRequired
        })
    ).isRequired,
    genre: PropTypes.oneOf([`indie-rock`, `rock`, `folk-rock`]).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default GenreQuestionScreen;
