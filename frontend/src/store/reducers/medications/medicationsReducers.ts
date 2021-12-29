import list from 'store/reducers/medications/medicationsListReducers';
import form from 'store/reducers/medications/medicationsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
