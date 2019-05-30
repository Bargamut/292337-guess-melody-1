import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player.jsx';

const mocks = {
  src: ``,
  isPlaying: false,
  isLoading: true,
  onPlayBtnClick: jest.fn()
};

it(`AudioPlayer renders correctly`, () => {
  const {src, isLoading, isPlaying, onPlayBtnClick} = mocks;

  const audioPlayer = renderer.create(
      <AudioPlayer
        src={src}
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
