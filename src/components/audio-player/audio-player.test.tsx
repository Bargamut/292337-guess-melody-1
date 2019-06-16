import * as React from 'react';
import * as renderer from 'react-test-renderer';

import AudioPlayer from './audio-player';

const mocks = {
  isPlaying: false,
  isLoading: true,
  onPlayBtnClick: jest.fn()
};

it(`AudioPlayer renders correctly`, () => {
  const {isLoading, isPlaying, onPlayBtnClick} = mocks;

  const audioPlayer = renderer.create(
      <AudioPlayer
        isPlaying={isPlaying}
        isLoading={isLoading}
        onPlayBtnClick={onPlayBtnClick}
        renderAudio={jest.fn()}
      />,
      {
        createNodeMock: (element) => {
          if (element.type === `audio`) {
            return {
              src: ``
            };
          }

          return null;
        }
      }
  );

  expect(audioPlayer).toMatchSnapshot();
});
