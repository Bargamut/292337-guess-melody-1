import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class AuthorizationScreen extends PureComponent {
  render() {
    const {
      onInputChange,
      onReplaybtnClick,
      onFormSubmit,
      isSubmitDisabled
    } = this.props;

    return (
      <section className="login">
        <div className="login__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
        </div>

        <h2 className="login__title">Вы настоящий меломан!</h2>

        <p className="login__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки</p>
        <p className="login__text">Хотите сравнить свой результат с предыдущими попытками? Представтесь!</p>

        <form className="login__form" action="#" onSubmit={onFormSubmit}>
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input className="login__input" type="text" name="name" id="name" onChange={(evt) => onInputChange(evt, `email`)} />
          </p>

          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input className="login__input" type="text" name="password" id="password" onChange={(evt) => onInputChange(evt, `password`)} />
            <span className="login__error">Неверный пароль</span>
          </p>

          <button className="login__button button" type="submit" disabled={isSubmitDisabled}>Войти</button>
        </form>

        <button className="replay" type="button" onClick={onReplaybtnClick}>Сыграть ещё раз</button>
      </section>
    );
  }
}

AuthorizationScreen.propTypes = {
  onInputChange: PropTypes.func,
  onReplaybtnClick: PropTypes.func,
  onFormSubmit: PropTypes.func,
  isSubmitDisabled: PropTypes.bool
};

export default AuthorizationScreen;
