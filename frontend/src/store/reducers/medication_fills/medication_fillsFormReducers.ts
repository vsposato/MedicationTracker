import {
  Medication_fillsFormState,
  Medication_fillsFormAction,
  Medication_fillsFormActionTypes,
} from 'types/redux/medication_fills/medication_fillsForm';

const initialData: Medication_fillsFormState = {
  findLoading: false,
  saveLoading: false,
  record: null,
};

export default (
  state = initialData,
  action: Medication_fillsFormAction,
): Medication_fillsFormState => {
  switch (action.type) {
    case Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_RESET:
      return {
        ...state,
      };
    case Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_FIND_STARTED:
      return {
        ...state,
        record: null,
        findLoading: true,
      };
    case Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_FIND_SUCCESS:
      return {
        ...state,
        record: action.payload,
        findLoading: false,
      };
    case Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_FIND_ERROR:
      return {
        ...state,
        record: null,
        findLoading: false,
      };
    case Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_CREATE_STARTED:
      return {
        ...state,
        saveLoading: true,
      };
    case Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_CREATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      };
    case Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_CREATE_ERROR:
      return {
        ...state,
        saveLoading: false,
      };
    case Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_UPDATE_STARTED:
      return {
        ...state,
        saveLoading: true,
      };
    case Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_UPDATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      };
    case Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_UPDATE_ERROR:
      return {
        ...state,
        saveLoading: false,
      };
    default:
      return state;
  }
};
