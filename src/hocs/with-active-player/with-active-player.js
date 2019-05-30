import React, {PureComponent} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player.jsx';
import withAudio from '../../hocs/with-audio/with-audio';

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerKey: null
      };

      this._handlePlayBtnClick = this._handlePlayBtnClick.bind(this);
    }

    render() {
      const {activePlayerKey} = this.state;

      return (
        <Component
          {...this.props}
          renderPlayer={(it, key = `answer-0`) => {
            return (
              <AudioPlayerWrapped
                src={it.src}
                isPlaying={key === activePlayerKey}
                onPlayBtnClick={() => {
                  this._handlePlayBtnClick(key);
                }}
              />
            );
          }}
        />
      );
    }

    _handlePlayBtnClick(key) {
      this.setState({
        activePlayerKey: this.state.activePlayerKey === key ? null : key
      });
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
