import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import homePageActions from '../../actions/homepageActions'
import _ from 'lodash';
import puzzleArray from '../../../puzzle.json';
import Cell from '../shared/Cell';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.init();
  }

  init() {
    this.initializeGrid();
    // iterate through json and load array. Also populate Across and Down arrays
    this.initializePuzzleArray();
  };

  initializeGrid () {
    const numRows = 11;
    const numCols = 12;
    // initialize grid with empty objects
    this.puzzleGrid = []; // Initialize array
    this.downHintsArray = [];
    this.acrossHintsArray = [];

    for (let i = 0 ; i < numRows; i++) {
      this.puzzleGrid[i] = []; // Initialize inner array
      for (let j = 0; j < numCols; j++) { // i++ needs to be j++
        this.puzzleGrid[i][j] = {};
      }
    }
  }

  initializePuzzleArray () {
    puzzleArray.forEach((wordObj, index) => {
      const lettersArray = wordObj.word.split('');
      this.addToHintsArray(wordObj);
      lettersArray.forEach((letter, index) => {
        this.addLetterToPuzzleArray(wordObj, letter, index);
      });
    });
  }

  addToHintsArray (word) {
    switch (word.wordOrientation) {
      case 'down':
        this.downHintsArray.push(word);
        break;
      case 'across':
        this.acrossHintsArray.push(word);
        break;
    }
  }

  addLetterToPuzzleArray (wordObj, letter, index) {
    const letterObj = {
      word: wordObj.word,
      wordNbr: wordObj.wordNbr,
      positionInWord: index,
      cellLetter: letter,
      wordOrientation: wordObj.wordOrientation,
      x: wordObj.wordOrientation === 'across' ? wordObj.startx + index : wordObj.startx,
      y: wordObj.wordOrientation === 'across' ? wordObj.starty : wordObj.starty + index
    };

    this.puzzleGrid[letterObj.y][letterObj.x] = letterObj;
  }

  render () {
    const cells = this.puzzleGrid.map((column, index) => {
      return column.map((cell, i) => {
        console.log(cell);
        return (
          <Cell
            orientation={cell.wordOrientation}
            letter={cell.cellLetter}
            isEmpty={_.isInteger(cell.positionInWord)}></Cell>
        );
      });
    });

    const downHints = _.sortBy(this.downHintsArray, 'wordNbr').map((word, index) => {
      return (
        <li>{word.wordNbr} {word.hint}</li>
      );
    });

    const acrossHints = _.sortBy(this.acrossHintsArray, 'wordNbr').map((word, index) => {
      return (
        <li>{word.wordNbr} {word.hint}</li>
      );
    });

    return (
      <div className="home-page">
        <h1><span className="k8color">K</span>r<span className="k8color">8</span>ssword Puzzle</h1>
        <div className="puzzle-container">
          {cells}
        </div>
        <div className="hint-container">
          <div className="down">
            <h2>Down</h2>
            <ul>
              {downHints}
            </ul>
          </div>
          <div className="across">
            <h2>Across</h2>
            <ul>
              {acrossHints}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  params: PropTypes.objectOf(PropTypes.string),
  actions: PropTypes.objectOf(PropTypes.func),
  state: PropTypes.object
};

function mapStateToProps (state) {
  return {
    state: state
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(homePageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
