import * as actions from './actionTypes';
import toastr from 'toastr';
const baseUrl = `http://${location.hostname}:3000/api`;

export function getPuzzleData () {
  return dispatch => {
    return fetch(`${baseUrl}/Crosswords`)
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        const puzzleData = json[0];
        dispatch({type: actions.puzzle.GET_PUZZLE_DATA, data: puzzleData});
      });
  };
}

export function submitPuzzleData (id, data) {
  return dispatch => {
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
        }
      })
      .then((json) => {
        toastr.success(`Progress saved!`);
        dispatch({type: actions.puzzle.SUBMIT_PUZZLE_DATA, data: json});
      });
  };
}
