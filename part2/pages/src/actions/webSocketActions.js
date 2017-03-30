import * as actions from './actionTypes';
import toastr from 'toastr';
let intervalId;

export function connectToWebSocket () {
  return dispatch => {
    toastr.success('Connected to WebSocket');

    dispatch({type: actions.websocket.CONNECT});
  };
}

export function receiveDataFromWebSocket (instanceCount) {
  return dispatch => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * instanceCount);
      return dispatch({type: actions.websocket.DATA_RECEIVED, data: randomNumber});
    }
    , 1000);
  };
}

export function disconnectFromWebSocket () {
  return dispatch => {
    toastr.success('Disconnected from WebSocket');
    clearInterval(intervalId);

    return dispatch({type: actions.websocket.DISCONNECT});
  };
}
