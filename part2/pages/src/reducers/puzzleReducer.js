import * as types from '../actions/actionTypes';

const initialState = {
  id: '',
  puzzleData: [],
  fromCache: false,
  sendingData: false
};

export default function puzzleReducer (state = initialState, action) {
  switch (action.type) {
    case types.puzzle.GET_PUZZLE_DATA_SUCCESS: {
      return Object.assign({}, state, {
        id: action.data.id,
        puzzleData: action.data.words,
        fromCache: action.data.fromCache,
        sendingData: false
      });
    }
    case types.puzzle.GET_PUZZLE_DATA_FAILURE: {
      return Object.assign({}, state, {
        sendingData: false
      });
    }
    case types.puzzle.SUBMIT_PUZZLE_DATA: {
      return Object.assign({}, state, {
        id: action.data.id,
        puzzleData: action.data.words,
        sendingData: false
      });
    }
    case types.puzzle.SENDING_DATA: {
      return Object.assign({}, state, {
        sendingData: true
      });
    }
    default: {
      return state;
    }
  }
}
