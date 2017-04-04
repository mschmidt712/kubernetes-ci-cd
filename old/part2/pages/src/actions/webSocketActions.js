import io from 'socket.io-client';
import constants from '../constants';
import * as types from './actionTypes';

const socket = io(`http://monitor-scale.${constants.minikubeIp}.xip.io`);

export function connectToSocket () {
  return dispatch => {
    socket.open(() => {
      dispatch({type: 'CONNECT_TO_SOCKET'});
    });
    socket.on('pods', (data) => {
      dispatch({ type: types.websocket.PODS, data });
    });
    socket.on('hit', (data) => {
      dispatch({ type: types.websocket.ACTIVE_INSTANCE, data });
    });
  };
}

export function disconnectFromSocket () {
  return dispatch => {
    socket.close(() => {
      dispatch({type: 'DISCONNECT_FROM_SOCKET'});
    });
  };
}
