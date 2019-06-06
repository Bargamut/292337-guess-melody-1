import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {ActionCreators} from '../../reducer/game/game';

import WelcomeScreen from '../../components/welcome-screen/welcome-screen.jsx';
import WinScreen from '../../components/win-screen/win-screen.jsx';
import GameOverScreen from '../../components/game-over-screen/game-over-screen.jsx';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen.jsx';

import GenreQuestionScreen from '../../components/genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen.jsx';

import withTransformProps from '../with-transform-props/with-transform-props';
import withActivePlayer from '../with-active-player/with-active-player';
import withUserAnswer from '../with-user-answer/with-user-answer';
import {getStep, getMistakes} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';
import {getISAuthorizationRequired} from '../../reducer/user/selectors';

/**
 * @description Отождествление prop'ы компонентов
 * @param {Object} props
 * @return {Object} Модифицированный объект props
 */
const assingProps = (props) => {
  return Object.assign({}, props, {
    renderAnswer: props.renderPlayer
  });
};

const GenreQuestionScreenWrapped = withUserAnswer(
    withActivePlayer(
        withTransformProps(assingProps)(GenreQuestionScreen)
    )
);
const ArtistQuestionScreenWrapped = withActivePlayer(
    withTransformProps(assingProps)(ArtistQuestionScreen)
);

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
      this._handleClickAnswer = this._handleClickAnswer.bind(this);
      this._handleClickStart = this._handleClickStart.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          renderScreen={this._getScreen}
        />
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
      if (this.props.isAuthorizationRequired) {
        return <AuthorizationScreen />;
      }

      const {
        step,
        mistakes,
        errorCount,
        onResetGame
      } = this.props;

      if (!question) {
        const {
          questions
        } = this.props;

        if (step > questions.length - 1) {
          return <WinScreen onReplayBtnClick={onResetGame} />;
        } else {
          const {
            time: gameTime
          } = this.props;

          return <WelcomeScreen
            time={gameTime}
            errorCount={errorCount}
            onClickStartBtn={this._handleClickStart}
          />;
        }
      }

      if (mistakes >= errorCount) {
        return <GameOverScreen onReplayBtnClick={onResetGame} />;
      }

      switch (question.type) {
        case `genre`:
          return <GenreQuestionScreenWrapped
            key={`genre-question-screen-${step}`}
            question={question}
            onAnswer={this._handleClickAnswer}
          />;
        case `artist`:
          return <ArtistQuestionScreenWrapped
            key={`article-question-screen-${step}`}
            question={question}
            onAnswer={this._handleClickAnswer}
          />;
      }

      return null;
    }

    /**
     * @description Обработать клик по ответу
     * @param {Object} userAnswer Ответ пользователя
     * @author Paul "Bargamut" Petrov
     * @date 2019-05-12
     * @memberof App
     */
    _handleClickAnswer(userAnswer) {
      const {questions, step} = this.props;

      this.props.onUserAnswer(questions[step], userAnswer);
    }

    /**
     * @description Обработать клик по кнопке старт
     * @author Paul "Bargamut" Petrov
     * @date 2019-05-25
     * @memberof App
     */
    _handleClickStart() {
      this.props.onClickStartBtn();
    }
  }

  WithScreenSwitch.propTypes = {
    time: PropTypes.number.isRequired,
    errorCount: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
    step: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    onClickStartBtn: PropTypes.func.isRequired,
    onUserAnswer: PropTypes.func.isRequired,
    onResetGame: PropTypes.func.isRequired,
    isAuthorizationRequired: PropTypes.bool.isRequired
  };

  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    step: getStep(state),
    mistakes: getMistakes(state),
    questions: getQuestions(state),
    isAuthorizationRequired: getISAuthorizationRequired(state)
  });
};

const mapDispatchToProps = (dispatch) => ({
  onClickStartBtn: () => {
    dispatch(ActionCreators.incrementStep());
  },
  onUserAnswer: (question, userAnswer) => {
    dispatch(ActionCreators.incrementMistake(question, userAnswer));
    dispatch(ActionCreators.incrementStep());
  },
  onResetGame: () => {
    dispatch(ActionCreators.resetState());
  }
});

export {withScreenSwitch};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
