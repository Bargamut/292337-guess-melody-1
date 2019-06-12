import React from 'react';
import PropTypes from 'prop-types';

const GameMistakes = ({mistakes}) => {
  return (
    <div className="game__mistakes">
      {new Array(mistakes).fill().map((_, i) => { // CHECK: лучше передавать для аргументов которые не юзаешь чета типа _
        return <div className="wrong" key={`wrong-answer-${i}`} />;
      })}
    </div>
  );
};

GameMistakes.propTypes = {
  mistakes: PropTypes.number.isRequired
};

export default GameMistakes;
