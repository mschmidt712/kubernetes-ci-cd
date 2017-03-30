import * as types from '../actions/actionTypes';

const initialState = {
  status: '',
  dataReceived: -1
};

export default function websocketReducer (state = initialState, action) {
  switch (action.type) {
    case types.websocket.CONNECT: {
      return Object.assign({}, state, {
        status: 'connected'
      });
    }
    case types.websocket.DISCONNECT: {
      return Object.assign({}, state, {
        status: 'disconnected'
      });
    }
    case types.websocket.DATA_RECEIVED: {
      return Object.assign({}, state, {
        dataReceived: action.data
      });
    }
    default: {
      return state;
    }
  }
}
