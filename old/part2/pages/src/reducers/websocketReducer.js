import * as types from '../actions/actionTypes';


const initialState = {
  connected: false,
  pods: [],
  activePod: undefined
};

export default function websocketReducer (state = initialState, action) {
  switch (action.type) {
    case types.websocket.CONNECT_TO_SOCKET: {
      return Object.assign({}, state, {
        connected: true
      });
    }
    case types.websocket.DISCONNECT_FROM_SOCKET: {
      return Object.assign({}, state, {
        connected: false
      });
    }
    case types.websocket.PODS: {
      console.log('pods emit handler', action.data.pods);
      return Object.assign({}, state, { pods: [0, 1, 2, 4] });
    }
    case types.websocket.ACTIVE_INSTANCE: {
      return Object.assign({}, state, { activePod: action.data.podId });
    }
    case types.websocket.SCALE: {
      // Do we need any hanlding here or will the changes be picked up by the websocket?
      return state;
    }
    default: {
      return state;
    }
  }
}
