import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createAPI} from '../../api';
import {ActionCreator} from '../../reducer/user/user';

const withAuthorization = (Component) => {
  class WithAuthorization extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleInputChange = this._handleInputChange.bind(this);
    }

    _handleInputChange(evt, keyName) {
      this.setState({
        [keyName]: evt.target.value
      });
    }

    _handleFormSubmit(evt) {
      evt.preventDefault();

      this.props.login(this.state);
    }

    render() {
      return (
        <Component
          {...this.props}
          onInputChange={this._handleInputChange}
          onFormSubmit={this._handleFormSubmit}
          isSubmitDisabled={!this.state.email || !this.state.password}
        />
      );
    }
  }

  WithAuthorization.propTypes = {
    onReplaybtnClick: PropTypes.func,
    login: PropTypes.func
  };

  return WithAuthorization;
};

const mapDispatchToProps = (dispatch) => ({
  login: (form) => {
    createAPI(dispatch)
      .post(`/login`, form)
      .then((response) => { // CHECK: стоит ловить ошибку
        // TODO: проверить почему не срабатывает .catch()
        if (response.data) {
          dispatch(ActionCreator.login(response.data));
          dispatch(ActionCreator.requireAuthorization(false));
        }
      });
  }
});

export {withAuthorization};

export default compose(
    connect(null, mapDispatchToProps),
    withAuthorization
);
