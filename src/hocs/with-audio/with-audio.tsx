import * as React from 'react';

interface Props {
  isPlaying: boolean,
  onPlayBtnClick: () => void,
  src: string
}

interface State {
  isLoading: boolean,
  isPlaying: boolean
}

const withAudio = (Component) => {
  class WithAudio extends React.PureComponent<Props, State> {
    private _audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying
      };

      this._audioRef = React.createRef();

      this._handlePlayBtnClick = this._handlePlayBtnClick.bind(this);
      this._renderAudio = this._renderAudio.bind(this);
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          renderAudio={this._renderAudio}
          onPlayBtnClick={this._handlePlayBtnClick}
          isPlaying={isPlaying}
          isLoading={isLoading}
        />
      );
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;

      audio.src = src;
      audio.oncanplaythrough = () => this.setState({isLoading: false});
      audio.onplay = () => this.setState({isPlaying: true});
      audio.onpause = () => this.setState({isPlaying: false});
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWilUnmount() {
      const audio = this._audioRef.current;

      audio.pause();

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    _renderAudio() {
      return <audio ref={this._audioRef} />;
    }

    _handlePlayBtnClick() {
      this.props.onPlayBtnClick();

      this.setState({isPlaying: !this.state.isPlaying});
    }
  }

  return WithAudio;
};

export default withAudio;
