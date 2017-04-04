import React, { PropTypes } from 'react';
import Cell from '../shared/Cell';
import Slider from '../shared/Slider';
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

  const sliderProperties = {
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 1,
    onChange: () => {}
  };

  return (
    <div className="crossword-container">
      <div className="puzzle-container">
        <div className="puzzle">
          {cells}
        </div>
        <Slider properties={sliderProperties} title={'Concurrent Requests: '}/>
        <div className="button-row">
          <button className="secondary">Reload</button>
          <button className="secondary">Clear</button>
          <button className="primary">Submit</button>
        </div>
      </div>
      <div className="puzzle-hints">
        <div className="hint-container">
          <div className="hint-category down">
            <h6 className="bold">Down</h6>
            <ul>
                {downHints}
            </ul>
          </div>
          <div className="hint-category across">
            <h6 className="bold">Across</h6>
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
