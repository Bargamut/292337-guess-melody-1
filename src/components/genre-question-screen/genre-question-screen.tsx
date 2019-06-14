import * as React from 'react';
import { QuestionGenre, AnswerGenre,  } from '../../types';

interface Props {
  question: QuestionGenre,
  renderAnswer: (answer: AnswerGenre, key?: string) => void,
  onChange: (number) => void,
  onAnswer: () => void,
  userAnswer: boolean[]
}

class GenreQuestionScreen extends React.PureComponent<Props, null> {
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

export default GenreQuestionScreen;
