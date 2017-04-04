import * as actions from './actionTypes';
import toastr from 'toastr';
const baseUrl = `http://${location.hostname}:3000/puzzle/v1`;
const arrowDisplayTime = 1000;

export function getPuzzleDataSuccess (json) {
  return {type: actions.puzzle.GET_PUZZLE_DATA_SUCCESS, data: json};
}

export function getPuzzleDataFailure () {
  return {type: actions.puzzle.GET_PUZZLE_DATA_FAILURE};
}

export function getPuzzleData () {
  return dispatch => {
    return fetch(`${baseUrl}/crossword`)
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        if (json.fromCache) {
          dispatch({type: actions.puzzle.FROM_CACHE, data: true});
          setTimeout(() => {
            return dispatch({type: actions.puzzle.FROM_CACHE, data: false});
          }, arrowDisplayTime);
        } else {
          dispatch({type: actions.puzzle.FROM_MONGO, data: true});
          setTimeout(() => {
            return dispatch({type: actions.puzzle.FROM_MONGO, data: false});
          }, arrowDisplayTime);
        }

        return dispatch(getPuzzleDataSuccess(json));
      })
      .catch(err => {
        toastr.error(err);
        dispatch(getPuzzleDataFailure(err));
      });
  };
}

export function submitPuzzleDataSuccess (json) {
  return {type: actions.puzzle.SUBMIT_PUZZLE_DATA_SUCCESS, data: json};
}

export function submitPuzzleDataFailure () {
  return {type: actions.puzzle.SUBMIT_PUZZLE_DATA_FAILURE};
}

export function submitPuzzleData (id, data) {
  return dispatch => {
    const submission = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return fetch(`${baseUrl}/crossword`, {
      method: 'PUT',
      headers,
      body: submission
    })
      .then((resp) => {
        if (resp.status === 204) {
          toastr.success(`Progress saved!`);
          dispatch(submitPuzzleDataSuccess(data));
        } else {
          toastr.error(`We're sorry! Something went wrong on your request.`);
          dispatch(submitPuzzleDataFailure);
        }
      })
      .catch((err) => {
        toastr.error(err);
        dispatch(submitPuzzleDataFailure);
      });
  };
}

export function sendingData () {
  return dispatch => {
    dispatch({type: actions.puzzle.SENDING_DATA, data: true});
    setTimeout(() => {
      return dispatch({type: actions.puzzle.SENDING_DATA, data: false});
    }, arrowDisplayTime);
  };
}

export function fromCache () {
  return dispatch => {
    dispatch({type: actions.puzzle.FROM_CACHE, data: true});
    setTimeout(() => {
      return dispatch({type: actions.puzzle.FROM_CACHE, data: false});
    }, arrowDisplayTime);
  };
}

export function fromMongo () {
  return dispatch => {
    dispatch({type: actions.puzzle.FROM_MONGO, data: true});
    setTimeout(() => {
      return dispatch({type: actions.puzzle.FROM_MONGO, data: false});
    }, arrowDisplayTime);
  };
}
