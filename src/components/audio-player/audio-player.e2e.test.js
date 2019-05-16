import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from './audio-player.jsx';

configure({adapter: new Adapter()});

const mocks = {
  isPlaying: false,
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
  onPlayBtnClick: () => {
    mocks.isPlaying = !mocks.isPlaying;

    return mocks.isPlaying;
  },
  clickHandler: jest.fn()
};

it(`Audio Player callback runs on PlayBtn click`, () => {
  const {src, isPlaying, clickHandler} = mocks;
  const audioPlayer = mount(
      <AudioPlayer
        src={src}
        isPlaying={isPlaying}
        onPlayBtnClick={clickHandler}
      />
  );

  audioPlayer.instance()._audioRef.current.pause = () => {};
  audioPlayer.instance()._audioRef.current.play = () => {};

  audioPlayer.setState({isLoading: false});
  audioPlayer.update();

  const btnPlay = audioPlayer.find(`.track__button`);

  expect(btnPlay.length).toEqual(1);

  btnPlay.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it(`Audio Player start / stop playback by clicking "Play" button`, () => {
  const {src, onPlayBtnClick} = mocks;
  const audioPlayer = mount(
      <AudioPlayer
        src={src}
        isPlaying={mocks.isPlaying}
        onPlayBtnClick={onPlayBtnClick}
      />
  );

  audioPlayer.instance()._audioRef.current.pause = () => {};
  audioPlayer.instance()._audioRef.current.play = () => {};

  audioPlayer.setState({isLoading: false});
  audioPlayer.update();

  const btnPlay = audioPlayer.find(`.track__button`);

  expect(btnPlay.length).toEqual(1);

  btnPlay.simulate(`click`);

  expect(audioPlayer.state(`isPlaying`)).toEqual(true);

  btnPlay.simulate(`click`);

  expect(audioPlayer.state(`isPlaying`)).toEqual(false);
});
