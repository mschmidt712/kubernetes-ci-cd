import io from 'socket.io-client';
import constants from '../constants';
import * as types from './actionTypes';

const baseUrl = `http://monitor-scale.${constants.minikubeIp}.xip.io`;
// const socket = io(baseUrl);

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

export function scale (data) {
  return dispatch => {
    const submission = JSON.stringify({'count': data});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return fetch(`${baseUrl}/scale`, {
      method: 'POST',
      headers,
      body: submission
    })
    .then(resp => (
      resp.json()
    ))
    .then(resp => {
      console.log(resp);
      dispatch({type: 'SCALE', data: resp});
    });
  };
}

export function submitConcurrentRequests (count) {
  return dispatch => {
    const submission = JSON.stringify({'count': count});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return fetch(`${baseUrl}/loadtest/concurrent`, {
      method: 'POST',
      headers,
      body: submission
    })
    .catch(err => {
      throw (err);
    });
  };
}

export function submitConsecutiveRequests (count) {
  return dispatch => {
    const submission = JSON.stringify({'count': count});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return fetch(`${baseUrl}/loadtest/consecutive`, {
      method: 'POST',
      headers,
      body: submission
    })
    .catch(err => {
      throw (err);
    });
  };
}
