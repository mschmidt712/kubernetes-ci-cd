import * as actions from './actionTypes';
import toastr from 'toastr';
const baseUrl = `http://${location.hostname}:3000/puzzle/v1`;

export function getPuzzleDataSuccess (json) {
  return {type: actions.puzzle.GET_PUZZLE_DATA_SUCCESS, data: json};
}

export function getPuzzleDataFailure () {
  return {type: actions.puzzle.GET_PUZZLE_DATA_FAILURE};
}

export function getPuzzleData () {
  return dispatch => {
    dispatch({type: actions.puzzle.SENDING_DATA});

    return fetch(`${baseUrl}/crossword`)
      .then((resp) => {
        return resp.json();
      })
      .then((json) => (
        dispatch(getPuzzleDataSuccess(json))
      ))
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
    dispatch({type: actions.puzzle.SENDING_DATA});

    const submission = JSON.stringify({
      words: data
    });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return fetch(`${baseUrl}/Crosswords/${id}`, {
      method: 'PUT',
      headers,
      body: submission
    })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          toastr.error(`We're sorry! Something went wrong on your request.`);
          dispatch(submitPuzzleDataFailure);
        }
      })
      .then((json) => {
        toastr.success(`Progress saved!`);
        dispatch(submitPuzzleDataSuccess(json));
      })
      .catch((err) => {
        toastr.error(err);
        dispatch(submitPuzzleDataFailure);
      });
  };
}
