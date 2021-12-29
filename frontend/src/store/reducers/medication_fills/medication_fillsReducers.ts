import list from 'store/reducers/medication_fills/medication_fillsListReducers';
import form from 'store/reducers/medication_fills/medication_fillsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
