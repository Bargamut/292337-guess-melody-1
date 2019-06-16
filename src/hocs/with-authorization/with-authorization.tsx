import * as React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createAPI} from '../../api';
import {ActionCreator} from '../../reducer/user/user';

interface State {
  email: string,
  password: string
};

interface Props {
  onReplayBtnClick: () => void,
  login: (state: object) => void
};

const withAuthorization = (Component) => {
  class WithAuthorization extends React.PureComponent<Props, State> {
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
      const diffState = {};

      diffState[keyName] = evt.target.value;

      this.setState(diffState);
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

  return WithAuthorization;
};

const mapDispatchToProps = (dispatch) => ({
  login: (form) => {
    createAPI(dispatch)
      .post(`/login`, form)
      .catch(() => {
        dispatch(ActionCreator.requireAuthorization(true));
      })
      .then((response) => {
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
