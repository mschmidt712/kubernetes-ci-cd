import React, { PropTypes } from 'react';
import Cell from '../shared/Cell';
import _ from 'lodash';

function PuzzleComponent (props) {
  const cells = props.puzzleGrid.map((column, index) => {
    return column.map((cell, i) => {
      return (
        <Cell
          key={index + i}
          orientation={cell.wordOrientation}
          letter={cell.cellLetter}
          isEmpty={_.isInteger(cell.positionInWord)}
          positionInWord={cell.positionInWord}
          wordNbr={cell.wordNbr}
        />
      );
    });
  });

  const downHints = _.sortBy(props.downHintsArray, 'wordNbr').map((word, index) => {
    return (
      <li key={index}>
        <p className="bold inline">{word.wordNbr}.</p> <p className="inline">{word.hint}</p>
      </li>
    );
  });

  const acrossHints = _.sortBy(props.acrossHintsArray, 'wordNbr').map((word, index) => {
    return (
      <li key={index}>
        <p className="bold inline">{word.wordNbr}.</p> <p className="inline">{word.hint}</p>
      </li>
    );
  });

  return (
    <div className="crossword-container">
      <div className="puzzle-container">
        <div className="puzzle">
          {cells}
        </div>
        <div className="button-row">
          <button className="secondary">Reload</button>
          <button className="secondary">Clear</button>
          <button className="primary">Submit</button>
        </div>
      </div>
      <div className="puzzle-hints">
        <div className="hint-container">
          <div className="hint-category down">
            <h4 className="bold">Down</h4>
            <ul>
                {downHints}
            </ul>
          </div>
          <div className="hint-category across">
            <h4 className="bold">Across</h4>
            <ul>
                {acrossHints}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

PuzzleComponent.propTypes = {
  downHintsArray: PropTypes.array,
  acrossHintsArray: PropTypes.array,
  puzzleGrid: PropTypes.array.isRequired
};

export default PuzzleComponent;
