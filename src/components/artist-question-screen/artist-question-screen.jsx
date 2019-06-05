import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ArtistQuestionScreen extends PureComponent {
  render() {
    const {question, renderAnswer, onAnswer} = this.props;
    const {song, answers} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          {renderAnswer(song)}
        </div>

        <form className="game__artist">
          {answers.map((it, i) => {
            const key = `answer-${i}`;

            return (
              <div className="artist" key={key}>
                <input
                  className="artist__input visually-hidden"
                  type="radio"
                  name="answer"
                  value={key}
                  id={key}
                  onChange={() => onAnswer(it)}
                />
                <label className="artist__name" htmlFor={key}>
                  <img className="artist__picture" src={it.photo} alt={it.artist} />
                  {it.artist}
                </label>
              </div>
            );
          })}
        </form>
      </section>
    );
  }
}

ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.oneOf([`Пелагея`, `Краснознаменная дивизия имени моей бабушки`, `Lorde`]).isRequired,
      src: PropTypes.string.isRequired
    }).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.oneOf([`Пелагея`, `Краснознаменная дивизия имени моей бабушки`, `Lorde`]).isRequired,
      photo: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  renderAnswer: PropTypes.func.isRequired
};

export default ArtistQuestionScreen;
