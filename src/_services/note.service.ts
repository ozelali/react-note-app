import axios from 'axios';
import { environment } from '../_config';

const API_URL = environment.API_URL;

export const noteService = {
  addNote,
  getNoteList,
  deleteNote,
  editNote,
};

function addNote(userid, note) {
  return axios
    .post(API_URL + `/user/${userid}/note`, { note: note })
    .then((note) => {
      return note;
    });
}

function getNoteList(userid) {
  return axios.get(API_URL + `/user/${userid}/note`).then((note) => {
    return note;
  });
}

function deleteNote(userid, noteid) {
  return axios
    .delete(API_URL + `/user/${userid}/note/${noteid}`)
    .then((note) => {
      return note;
    });
}

function editNote(userid, noteid, note) {
  return axios
    .put(API_URL + `/user/${userid}/note/${noteid}`, note)
    .then((note) => {
      return note;
    });
}
