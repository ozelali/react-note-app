import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { note } from './note.reducer';

const rootReducer = combineReducers({
  user,
  note,
});

export default rootReducer;
