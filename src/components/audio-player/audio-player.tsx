import * as React from 'react';

interface Props {
  isPlaying: boolean,
  isLoading: boolean,
  onPlayBtnClick: () => void,
  renderAudio: () => React.ReactElement
}

class AudioPlayer extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);
  }

  render() {
    const {renderAudio, onPlayBtnClick, isLoading, isPlaying} = this.props;

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

export default AudioPlayer;
