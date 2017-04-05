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

<<<<<<< HEAD
  convertPuzzleGridToPuzzleArray () {
    const submission = this.props.puzzleArray.map((word) => {
      const startx = word.startx;
      const starty = word.starty;
      const length = word.word.length;
      const direction = word.wordOrientation;

      const enteredLetters = this.state.puzzleGrid.map((colData, row) => {
        return colData.map((cell, col) => {
          if (startx === col && starty === row) {
            return cell.currentValue || '*';
          }

          for (let i = 1; i < length; i++) {
            if (direction === 'down' && startx === col && starty + i === row) {
              return cell.currentValue || '*';
            } else if (direction === 'across' && startx + i === col && starty === row) {
              return cell.currentValue || '*';
            }
          }
        });
      });

      const enteredValue = enteredLetters.reduce((arr, val) => {
        return arr.concat(val);
      }).join('');

      return Object.assign({}, word, {
        enteredValue
      });
    });

    return submission;
  }

  reloadPuzzle () {
    this.props.actions.sendingData();
    this.props.actions.getPuzzleData();
  }

  clearPuzzle () {
    let submission = [...this.props.puzzleArray];
    submission = submission.map(obj => {
      const letters = obj.enteredValue.length;
      obj.enteredValue = new Array(letters).fill('*').join('');
      return obj;
    });

    this.props.actions.sendingData();
    this.props.actions.submitPuzzleData(this.props.puzzleId, submission);
  }

  submitPuzzle (e) {
    e.preventDefault();
    const submission = this.convertPuzzleGridToPuzzleArray();

    this.props.actions.sendingData();
    this.props.actions.submitPuzzleData(this.props.puzzleId, submission);
  }

  render () {
    const sliderProperties = {
      min: 1,
      max: 10,
      step: 1,
      defaultValue: 1,
      onChange: () => {}
    };
=======
  const downHints = _.sortBy(props.downHintsArray, 'wordNbr').map((word, index) => {
    return (
      <li key={index}>
        <p className="bold inline">{word.wordNbr}.</p> <p className="inline">{word.hint}</p>
      </li>
    );
  });
>>>>>>> c8805f9dc2a197acbe20e45c35cc80ba3281de91

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
