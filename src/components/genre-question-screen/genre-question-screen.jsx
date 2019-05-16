import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayerKey: null
    };
  }

  render() {
    const {question, onAnswer} = this.props;
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
                    <AudioPlayer
                      src={it.src}
                      isPlaying={key === this.state.activePlayerKey}
                      onPlayBtnClick={() => this.setState({
                        activePlayerKey: this.state.activePlayerKey === key ? null : key
                      })}
                    />

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
  onAnswer: PropTypes.func.isRequired
};

export default GenreQuestionScreen;
