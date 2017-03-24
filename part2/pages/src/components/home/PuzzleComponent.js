import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/puzzleActions';
import Cell from '../shared/Cell';
import Slider from '../shared/Slider';
import _ from 'lodash';

class PuzzleComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      cells: [],
      downHints: [],
      acrossHints: []
    };

    this.initializePuzzleArray = this.initializePuzzleArray.bind(this);
  }

  componentWillMount () {
    this.props.actions.getPuzzleData();
  }

  componentWillReceiveProps (newProps) {
    if (this.props.puzzleArray !== newProps.puzzleArray) {
      this.initializePuzzleArray(newProps.puzzleArray);
    }
  }

  initializeGrid () {
    const puzzleGrid = [];
    const maxRows = 12;
    const maxColumns = 11;

    for (var i = 0; i < maxColumns; i++) {
      puzzleGrid.push(new Array(maxRows).fill(''));
    }

    return puzzleGrid;
  }

  initializePuzzleArray (puzzleArray) {
    const downHintsArray = puzzleArray.filter((word) => {
      return (word.wordOrientation === 'down');
    });
    const acrossHintsArray = puzzleArray.filter((word) => {
      return (word.wordOrientation === 'across');
    });

    const downHints = this.buildHints(downHintsArray);
    const acrossHints = this.buildHints(acrossHintsArray);

    let puzzleGrid = [...this.initializeGrid()];
    puzzleArray.forEach((wordObj, index) => {
      const lettersArray = wordObj.word.split('');
      lettersArray.forEach((letter, index) => {
        puzzleGrid = this.addLetterToPuzzleArray(puzzleGrid, wordObj, letter, index);
      });
    });

    const cells = this.buildCells(puzzleGrid);
    console.log(cells);

    this.setState({
      downHints,
      acrossHints,
      cells
    });
  }

  addLetterToPuzzleArray (puzzleGrid, wordObj, letter, index) {
    const letterObj = {
      word: wordObj.word,
      wordNbr: wordObj.wordNbr,
      positionInWord: index,
      cellLetter: letter,
      wordOrientation: wordObj.wordOrientation,
      x: wordObj.wordOrientation === 'across' ? wordObj.startx + index : wordObj.startx,
      y: wordObj.wordOrientation === 'across' ? wordObj.starty : wordObj.starty + index
    };

    puzzleGrid[letterObj.y][letterObj.x] = letterObj;

    return puzzleGrid;
  }

  buildCells (puzzleGrid) {
    return puzzleGrid.map((column, index) => {
      return column.map((cell, i) => {
        return (
          <Cell
            key={index + i}
            orientation={cell.wordOrientation}
            letter={cell.cellLetter}
            isEmpty={!_.isInteger(cell.positionInWord)}
            positionInWord={cell.positionInWord}
            wordNbr={cell.wordNbr}
          />
        );
      });
    });
  }

  buildHints (hintsArray) {
    return _.sortBy(hintsArray, 'wordNbr').map((word, index) => {
      return (
        <li key={index}>
          <p className="bold inline">{word.wordNbr}.</p> <p className="inline">{word.hint}</p>
        </li>
      );
    });
  }

  render () {
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
            {this.state.cells}
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
                  {this.state.downHints}
              </ul>
            </div>
            <div className="hint-category across">
              <h6 className="bold">Across</h6>
              <ul>
                  {this.state.acrossHints}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PuzzleComponent.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  state: PropTypes.object,
  puzzleArray: PropTypes.array
};

function mapStateToProps (state) {
  return {
    puzzleArray: state.puzzle.puzzleData || []
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleComponent);
