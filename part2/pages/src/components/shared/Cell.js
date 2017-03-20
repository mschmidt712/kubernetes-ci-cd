import React from 'react';

const Cell = ({isEmpty, positionInWord, wordNbr, letter}) => {

  const showWordNumber = positionInWord === 0 ? true : false

  return (
    <div className={'cell ' + isEmpty}>
      <div className="wordNbr">{showWordNumber ? wordNbr : ''}</div>
      <input type="text" maxLength="1" size="1" defaultValue={letter}/>
    </div>
  );
};

export default Cell;
