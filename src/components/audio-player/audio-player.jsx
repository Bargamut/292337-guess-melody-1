import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {renderAudio, onPlayBtnClick, isLoading, isPlaying} = this.props;
    // CHECK: вместо renderAudio() можно просто делать там {this.props.children}
    // и передавать внутрь то что надо рендерить сразу, а не прокидывать и вызывать
    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={onPlayBtnClick}
        />

        <div className="track__status">
          {renderAudio()}
        </div>
      </React.Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPlayBtnClick: PropTypes.func.isRequired,
  renderAudio: PropTypes.func.isRequired
};

export default AudioPlayer;
