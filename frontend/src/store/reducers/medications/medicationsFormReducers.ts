import {
  MedicationsFormState,
  MedicationsFormAction,
  MedicationsFormActionTypes,
} from 'types/redux/medications/medicationsForm';

const initialData: MedicationsFormState = {
  findLoading: false,
  saveLoading: false,
  record: null,
};

export default (state = initialData, action: MedicationsFormAction): MedicationsFormState => {
  switch (action.type) {
    case MedicationsFormActionTypes.MEDICATIONS_FORM_RESET:
      return {
        ...state,
      };
    case MedicationsFormActionTypes.MEDICATIONS_FORM_FIND_STARTED:
      return {
        ...state,
        record: null,
        findLoading: true,
      };
    case MedicationsFormActionTypes.MEDICATIONS_FORM_FIND_SUCCESS:
      return {
        ...state,
        record: action.payload,
        findLoading: false,
      };
    case MedicationsFormActionTypes.MEDICATIONS_FORM_FIND_ERROR:
      return {
        ...state,
        record: null,
        findLoading: false,
      };
    case MedicationsFormActionTypes.MEDICATIONS_FORM_CREATE_STARTED:
      return {
        ...state,
        saveLoading: true,
      };
    case MedicationsFormActionTypes.MEDICATIONS_FORM_CREATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      };
    case MedicationsFormActionTypes.MEDICATIONS_FORM_CREATE_ERROR:
      return {
        ...state,
        saveLoading: false,
      };
    case MedicationsFormActionTypes.MEDICATIONS_FORM_UPDATE_STARTED:
      return {
        ...state,
        saveLoading: true,
      };
    case MedicationsFormActionTypes.MEDICATIONS_FORM_UPDATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      };
    case MedicationsFormActionTypes.MEDICATIONS_FORM_UPDATE_ERROR:
      return {
        ...state,
        saveLoading: false,
      };
    default:
      return state;
  }
};
