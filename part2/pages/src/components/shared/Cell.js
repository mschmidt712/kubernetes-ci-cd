import React from 'react';

const Cell = ({isEmpty, numberedCell, orientation, letter}) => {
  return (
    <div className={'cell ' + isEmpty}>
      <input type="text" maxLength="1" size="1" defaultValue={letter}/>
    </div>
  );
};

export default Cell;
