export enum Type {
  ARTIST = 'artist',
  GENRE = 'genre'
}

export interface QuestionArtist {
  answers: {
    artist: string,
    picture: string
  }[],
  song: {
    artist: string,
    src: string
  },
  type: Type
}

export interface QuestionGenre {
  answers: {
    artist: string,
    picture: string
  }[],
  genre: string,
  type: Type
}
