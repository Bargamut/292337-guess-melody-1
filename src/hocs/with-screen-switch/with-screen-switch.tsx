import * as React from 'react';
import { QuestionArtist, QuestionGenre, AnswerArtist, AnswerGenre } from '../../types';

import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import {compose} from 'recompose';
import {ActionCreator} from '../../reducer/game/game';
import {getStep, getMistakes} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

import WelcomeScreen from '../../components/welcome-screen/welcome-screen';
import WinScreen from '../../components/win-screen/win-screen';
import GameOverScreen from '../../components/game-over-screen/game-over-screen';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen';

import GenreQuestionScreen from '../../components/genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen';

import withAuthorization from '../with-authorization/with-authorization';
import withTransformProps from '../with-transform-props/with-transform-props';
import withActivePlayer from '../with-active-player/with-active-player';
import withUserAnswer from '../with-user-answer/with-user-answer';

type Question = QuestionArtist | QuestionGenre;
type Answer = AnswerArtist | AnswerGenre;

interface Props {
  time: number,
  errorCount: number,
  questions: Question[],
  step: number,
  mistakes: number,
  onClickStartBtn: () => void,
  onUserAnswer: (question: Question, userAnswer: Answer) => void,
  onResetGame: () => void,
  isAuthorizationRequired: boolean
};

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
  class WithScreenSwitch extends React.PureComponent<Props, null> {
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
            <WinScreen
              onReplayBtnClick={onResetGame}
            />
          )} />


          <Route path="/lose" render={() => (
            <GameOverScreen
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
        questions,
        mistakes,
        errorCount,
        isAuthorizationRequired
      } = this.props;

      if (step >= questions.length) {
        return (isAuthorizationRequired)
          ? <Redirect to="/login" />
          : <Redirect to="/results" />;
      }

      if (mistakes >= errorCount) {
        return <Redirect to="/lose" />;
      }

      if (!question) {
        const {
          time: gameTime
        } = this.props;

        return <WelcomeScreen
          time={gameTime}
          errorCount={errorCount}
          onClickStartBtn={this._handleClickStart}
        />;
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
  onUserAnswer: (question: Question, userAnswer: Answer) => {
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
