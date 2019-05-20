import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    const {isPlaying} = props;

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying
    };

    this._audioRef = React.createRef();

    this._handlePlayBtnClick = this._handlePlayBtnClick.bind(this);
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._handlePlayBtnClick}
        />

        <div className="track__status">
          <audio ref={this._audioRef} />
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const {src} = this.props;
    this._audio = this._audioRef.current;

    this._audio.src = src;
    this._audio.oncanplaythrough = () => this.setState({isLoading: false});
    this._audio.onplay = () => this.setState({isPlaying: true});
    this._audio.onpause = () => this.setState({isPlaying: false});
    this._audio.ontimeupdate = () => this.setState({progress: this._audio.currentTime});
  }

  componentDidUpdate() {
    this._audio = this._audioRef.current;

    if (this.props.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }

  componentWilUnmount() {
    this._audio = this._audioRef.current;

    this._audio.pause();

    this._audio = null;
    this._audio.oncanplaythrough = null;
    this._audio.onplay = null;
    this._audio.onpause = null;
    this._audio.ontimeupdate = null;
    this._audio.src = ``;
    this._audio = null;
  }

  _handlePlayBtnClick() {
    this.props.onPlayBtnClick();

    this.setState({isPlaying: !this.state.isPlaying});
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayBtnClick: PropTypes.func.isRequired
};

export default AudioPlayer;