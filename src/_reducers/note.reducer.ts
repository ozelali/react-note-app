import { noteConstants } from '../_constants';

type NoteState = {
  notes: Array<any>;
  loading: boolean;
  error: string;
};

export function note(
  state: NoteState = {
    notes: [],
    loading: false,
    error: '',
  },
  action: any
) {
  switch (action.type) {
    case noteConstants.ADD_REQUEST:
      return {
        notes: [],
        loading: true,
        error: null,
      };
    case noteConstants.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case noteConstants.ADD_FAILURE:
      return {
        notes: [],
        loading: false,
        error: 'hata',
      };

    case noteConstants.GET_REQUEST:
      return {
        notes: [],
        loading: true,
        error: null,
      };
    case noteConstants.GET_SUCCESS:
      return {
        notes: action.note.data,
        loading: false,
        error: null,
      };
    case noteConstants.GET_FAILURE:
      return {
        notes: [],
        loading: false,
        error: 'hata',
      };
    case noteConstants.DELETE_REQUEST:
      return {
        notes: state.notes,
        loading: true,
        error: null,
      };
    case noteConstants.DELETE_SUCCESS:
      return {
        notes: state.notes.filter((note) => {
          if (note.id !== action.noteid) {
            return note;
          }
        }),
        loading: false,
        error: null,
      };
    case noteConstants.DELETE_FAILURE:
      return {
        notes: state.notes,
        loading: true,
        error: 'hata',
      };

    case noteConstants.EDIT_REQUEST:
      return {
        notes: state.notes,
        loading: true,
        error: null,
      };
    case noteConstants.EDIT_FAILURE:
      return {
        notes: state.notes,
        loading: true,
        error: 'hata',
      };

    default:
      return state;
  }
}
