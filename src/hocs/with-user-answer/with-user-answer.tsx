import * as React from 'react';
import { Subtract } from 'utility-types';

interface State {
  userAnswer: boolean[]
};

interface Props {
  question: {
    type: string,
    answers: {
      genre: string,
      src: string
    }[],
    genre: string
  },
  onAnswer: (answers: boolean[]) => void
};

interface InjectedProps {
  userAnswer: boolean[],
  onChange: (i: number) => void,
  onAnswer: () => void
};

const withUserAnswer = (Component) => {
  // Объединяем с Props
  type P = Props & React.ComponentProps<typeof Component>;

  type T = Subtract<P, InjectedProps>;

  class WithUserAnswer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      const {answers} = props.question;

      this.state = {
        userAnswer: new Array(answers.length).fill(false)
      };

      this._handleChange = this._handleChange.bind(this);
      this._handleAnswer = this._handleAnswer.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          userAnswer={this.state.userAnswer}
          onChange={this._handleChange}
          onAnswer={this._handleAnswer}
        />
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

    /**
     * @description Обработчик ответа на вопрос
     * @author Paul "Bargamut" Petrov
     * @date 2019-05-30
     * @memberof WithUserAnswer
     */
    _handleAnswer() {
      const {onAnswer} = this.props;

      onAnswer(this.state.userAnswer);
    }
  }

  return WithUserAnswer;
};

export default withUserAnswer;
