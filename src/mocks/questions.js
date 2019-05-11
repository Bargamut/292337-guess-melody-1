const settings = {
  gameTime: 5,
  errorCount: 3,
  onClickStartBtn: () => {}
};

export const questions = [
  {
    type: `genre`,
    genre: `indie-rock`,
    answers: [
      {
        genre: `indie-rock`,
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
      },
      {
        genre: `rock`,
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
      },
      {
        genre: `indie-rock`,
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
      },
      {
        genre: `folk-rock`,
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
      }
    ]
  },
  {
    type: `artist`,
    title: `Кто исполняет эту песню?`,
    artist: `Пелагея`,
    answers: [
      {
        artist: `Пелагея`,
        src: ``
      },
      {
        artist: `Краснознаменная дивизия имени моей бабушки`,
        src: ``
      },
      {
        artist: `Lorde`,
        src: ``
      }
    ]
  }
];

export default settings;
