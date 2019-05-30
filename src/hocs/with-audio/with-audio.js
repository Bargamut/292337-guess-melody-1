import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withAudio = (Component) => {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      const {isPlaying} = props;

      this.state = {
        isLoading: true,
        isPlaying
      };

      this._audioRef = React.createRef();

      this._handlePlayBtnClick = this._handlePlayBtnClick.bind(this);
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          renderAudio={() => {
            return <audio ref={this._audioRef} />;
          }}
          onPlayBtnClick={this._handlePlayBtnClick}
          isPlaying={isPlaying}
          isLoading={isLoading}
        />
      );
    }

    componentDidMount() {
      const {src} = this.props;
      this._audio = this._audioRef.current;

      this._audio.src = src;
      this._audio.oncanplaythrough = () => this.setState({isLoading: false});
      this._audio.onplay = () => this.setState({isPlaying: true});
      this._audio.onpause = () => this.setState({isPlaying: false});
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

  WithAudio.propTypes = {
    src: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    onPlayBtnClick: PropTypes.func.isRequired
  };

  return WithAudio;
};

export default withAudio;
