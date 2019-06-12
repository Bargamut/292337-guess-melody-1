import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {ActionCreator} from '../../reducer/game/game';
import {getStep, getMistakes} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

import WelcomeScreen from '../../components/welcome-screen/welcome-screen.jsx';
import WinScreen from '../../components/win-screen/win-screen.jsx';
import GameOverScreen from '../../components/game-over-screen/game-over-screen.jsx';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen.jsx';
import ResultsSuccessScreen from '../../components/results-success-screen/results-success-screen.jsx';

import GenreQuestionScreen from '../../components/genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen.jsx';

import withAuthorization from '../with-authorization/with-authorization';
import withTransformProps from '../with-transform-props/with-transform-props';
import withActivePlayer from '../with-active-player/with-active-player';
import withUserAnswer from '../with-user-answer/with-user-answer';

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

const AuthorizationScreenWrapped = withAuthorization(AuthorizationScreen);
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
      const {onResetGame} = this.props;

      return (
        <Switch>
          <Route path="/login" render={() => (
            <AuthorizationScreenWrapped
              onReplayBtnClick={onResetGame}
            />
          )} />

          <Route path="/results" render={() => (
            <ResultsSuccessScreen
              onReplayBtnClick={onResetGame}
            />
          )} />

          <Route path="/" exact render={() => (
            <Component
              {...this.props}
              renderScreen={this._getScreen}
            />
          )}/>
        </Switch>
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
    isAuthorizationRequired: getAuthorizationStatus(state)
  });
};

const mapDispatchToProps = (dispatch) => ({
  onClickStartBtn: () => {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer: (question, userAnswer) => {
    dispatch(ActionCreator.incrementMistake(question, userAnswer));
    dispatch(ActionCreator.incrementStep());
  },
  onResetGame: () => {
    dispatch(ActionCreator.resetState());
  }
});

export {withScreenSwitch};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
