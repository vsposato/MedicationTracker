import {
  Medication_fillsListState,
  Medication_fillsListAction,
  Medication_fillsListActionTypes,
} from 'types/redux/medication_fills/medication_fillsList';

const initialData: Medication_fillsListState = {
  rows: [],
  loading: false,
  count: 0,
  modalOpen: false,
  idToDelete: null,
};

export default (
  state = initialData,
  action: Medication_fillsListAction,
): Medication_fillsListState => {
  switch (action.type) {
    case Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_FILTERED:
      return {
        ...state,
        rows: action.payload!.rows,
        loading: false,
      };
    case Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        rows: action.payload!.rows,
        loading: false,
        count: action.payload!.count,
      };
    case Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        rows: [],
      };
    case Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_DELETE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      };
    case Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      };
    case Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_OPEN_CONFIRM:
      return {
        ...state,
        loading: false,
        modalOpen: true,
        idToDelete: action.payload.id,
      };
    case Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_CLOSE_CONFIRM:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      };
    default:
      return state;
  }
};
