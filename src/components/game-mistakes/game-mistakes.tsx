import * as React from 'react';

interface Props {
  mistakes: number
};

const GameMistakes: React.FunctionComponent<Props> = ({mistakes}) => {
  return (
    <div className="game__mistakes">
      {new Array(mistakes).fill(0).map((_, i: number) => {
        return <div className="wrong" key={`wrong-answer-${i}`} />;
      })}
    </div>
  );
};

export default GameMistakes;
