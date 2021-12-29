import {
  MedicationsListState,
  MedicationsListAction,
  MedicationsListActionTypes,
} from 'types/redux/medications/medicationsList';

const initialData: MedicationsListState = {
  rows: [],
  loading: false,
  count: 0,
  modalOpen: false,
  idToDelete: null,
};

export default (state = initialData, action: MedicationsListAction): MedicationsListState => {
  switch (action.type) {
    case MedicationsListActionTypes.MEDICATIONS_LIST_FILTERED:
      return {
        ...state,
        rows: action.payload!.rows,
        loading: false,
      };
    case MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        rows: action.payload!.rows,
        loading: false,
        count: action.payload!.count,
      };
    case MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        rows: [],
      };
    case MedicationsListActionTypes.MEDICATIONS_LIST_DELETE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case MedicationsListActionTypes.MEDICATIONS_LIST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      };
    case MedicationsListActionTypes.MEDICATIONS_LIST_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      };
    case MedicationsListActionTypes.MEDICATIONS_LIST_OPEN_CONFIRM:
      return {
        ...state,
        loading: false,
        modalOpen: true,
        idToDelete: action.payload.id,
      };
    case MedicationsListActionTypes.MEDICATIONS_LIST_CLOSE_CONFIRM:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      };
    default:
      return state;
  }
};
