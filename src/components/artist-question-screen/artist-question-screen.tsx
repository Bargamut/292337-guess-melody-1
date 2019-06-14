import * as React from 'react';
import {QuestionArtist, Song, AnswerArtist} from '../../types';

interface Props {
  question: QuestionArtist,
  onAnswer: (answer: AnswerArtist) => void,
  renderAnswer: (song: Song, key?: string) => React.ReactElement
}

class ArtistQuestionScreen extends React.PureComponent<Props, null> {
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
                  <img className="artist__picture" src={it.picture} alt={it.artist} />
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

export default ArtistQuestionScreen;
