import * as React from 'react';
import { Subtract } from 'utility-types';
import AudioPlayer from '../../components/audio-player/audio-player.jsx';
import withAudio from '../with-audio/with-audio';

interface State {
  activePlayerKey: string | null
}

// Пропсы, добавляемые HOC'ом
interface InjectedProps {
  renderPlayer: (song: {src: string}, key: string) => typeof AudioPlayerWrapped
}

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  // Получаем пропсы переданного компонента
  type P = React.ComponentProps<typeof Component>;

  // Вычисляем реальные пропсы для передачи в обёрнутый компонент
  // Условно: T = P - InjectedProps
  type T = Subtract<P, InjectedProps>;

  class WithActivePlayer extends React.PureComponent<T, State> {
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

  return WithActivePlayer;
};

export default withActivePlayer;
