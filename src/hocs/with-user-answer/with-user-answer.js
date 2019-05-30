import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
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

  WithUserAnswer.propTypes = {
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

  return WithUserAnswer;
};

export default withUserAnswer;
