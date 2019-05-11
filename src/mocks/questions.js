const settings = {
  gameTime: 5,
  errorCount: 3
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
    song: {
      artist: `Пелагея`,
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
    },
    answers: [
      {
        artist: `Пелагея`,
        photo: `http://placehold.it/134x134`
      },
      {
        artist: `Краснознаменная дивизия имени моей бабушки`,
        photo: `http://placehold.it/134x134`
      },
      {
        artist: `Lorde`,
        photo: `http://placehold.it/134x134`
      }
    ]
  }
];

export default settings;
