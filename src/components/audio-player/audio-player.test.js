import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player.jsx';

const mocks = {
  src: ``,
  isPlaying: false,
  onPlayBtnClick: jest.fn()
};

it(`AudioPlayer renders correctly`, () => {
  const {src, isPlaying, onPlayBtnClick} = mocks;

  const audioPlayer = renderer.create(
      <AudioPlayer
        src={src}
        isPlaying={isPlaying}
        onPlayBtnClick={onPlayBtnClick}
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
