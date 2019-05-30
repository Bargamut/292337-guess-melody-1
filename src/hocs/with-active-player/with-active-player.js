import React, {PureComponent} from 'react';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerKey: null
      };
    }

    render() {
      const {activePlayerKey} = this.state;

      return (
        <Component
          {...this.props}
          activePlayerKey={activePlayerKey}
          onPlayBtnClick={(key) => this.setState({
            activePlayerKey: activePlayerKey === key ? null : key
          })}
        />
      );
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
