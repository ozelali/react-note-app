import { noteConstants } from '../_constants';
import { noteService } from '../_services';

export const noteActions = {
  getNotes,
  addNote,
  deleteNote,
  editNote,
};

function getNotes(userid) {
  return (dispatch) => {
    // dispatch(request());

    noteService.getNoteList(userid).then(
      (note) => {
        dispatch(success(note));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function success(note) {
    return { type: noteConstants.GET_SUCCESS, note };
  }
  function failure(error) {
    return { type: noteConstants.GET_FAILURE, error };
  }
}

function addNote(userid, note) {
  return (dispatch) => {
    dispatch(request(note));

    noteService.addNote(userid, note).then(
      (note) => {
        dispatch(getNotes(userid));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(note) {
    return { type: noteConstants.ADD_REQUEST, note };
  }
  function failure(error) {
    return { type: noteConstants.ADD_FAILURE, error };
  }
}

function deleteNote(userid, noteid) {
  return (dispatch) => {
    dispatch(request());

    noteService.deleteNote(userid, noteid).then(
      (note) => {
        dispatch(success(noteid));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: noteConstants.DELETE_REQUEST };
  }
  function success(noteid) {
    return { type: noteConstants.DELETE_SUCCESS, noteid };
  }
  function failure(error) {
    return { type: noteConstants.DELETE_FAILURE, error };
  }
}

function editNote(userid, noteid, note) {
  return (dispatch) => {
    dispatch(request());
    noteService.editNote(userid, noteid, { note }).then(
      (note) => {
        dispatch(getNotes(userid));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: noteConstants.EDIT_REQUEST };
  }
  function failure(error) {
    return { type: noteConstants.EDIT_FAILURE, error };
  }
}
