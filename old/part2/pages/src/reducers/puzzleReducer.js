import * as types from '../actions/actionTypes';

const initialState = {
  fromCache: false,
  fromMongo: false,
  sendingData: false,
  puzzleId: '',
  puzzleData: []
};

export default function puzzleReducer (state = initialState, action) {
  switch (action.type) {
    case types.puzzle.GET_PUZZLE_DATA_SUCCESS: {
      return Object.assign({}, state, {
        puzzleData: action.data.words
      });
    }
    case types.puzzle.GET_PUZZLE_DATA_FAILURE: {
      return state;
    }
    case types.puzzle.SUBMIT_PUZZLE_DATA_SUCCESS: {
      return Object.assign({}, state, {
        puzzleData: action.data.words
      });
    }
    case types.puzzle.SUBMIT_PUZZLE_DATA_FAILURE: {
      return state;
    }
    case types.puzzle.SENDING_DATA: {
      return Object.assign({}, state, {
        sendingData: action.data
      });
    }
    case types.puzzle.FROM_MONGO: {
      return Object.assign({}, state, {
        fromMongo: action.data
      });
    }
    case types.puzzle.FROM_CACHE: {
      return Object.assign({}, state, {
        fromCache: action.data
      });
    }
    case types.websocket.PODS: {
      console.log('pods emit handler', action.data.pods);
      return Object.assign({}, state, { pods: [0, 1, 2, 4] });
    }
    case types.websocket.ACTIVE_INSTANCE: {
      return Object.assign({}, state, { activePod: action.data.podId });
    }
    default: {
      return state;
    }
  }
}
