export interface MedicationsFormState {
  findLoading: boolean;
  saveLoading: boolean;
  record: null | any;
}

export enum MedicationsFormActionTypes {
  MEDICATIONS_FORM_RESET = 'MEDICATIONS_FORM_RESET',
  MEDICATIONS_FORM_FIND_STARTED = 'MEDICATIONS_FORM_FIND_STARTED',
  MEDICATIONS_FORM_FIND_SUCCESS = 'MEDICATIONS_FORM_FIND_SUCCESS',
  MEDICATIONS_FORM_FIND_ERROR = 'MEDICATIONS_FORM_FIND_ERROR',
  MEDICATIONS_FORM_CREATE_STARTED = 'MEDICATIONS_FORM_CREATE_STARTED',
  MEDICATIONS_FORM_CREATE_SUCCESS = 'MEDICATIONS_FORM_CREATE_SUCCESS',
  MEDICATIONS_FORM_CREATE_ERROR = 'MEDICATIONS_FORM_CREATE_ERROR',
  MEDICATIONS_FORM_UPDATE_STARTED = 'MEDICATIONS_FORM_UPDATE_STARTED',
  MEDICATIONS_FORM_UPDATE_SUCCESS = 'MEDICATIONS_FORM_UPDATE_SUCCESS',
  MEDICATIONS_FORM_UPDATE_ERROR = 'MEDICATIONS_FORM_UPDATE_ERROR',
}

interface MedicationsFormReset {
  type: MedicationsFormActionTypes.MEDICATIONS_FORM_RESET;
}

interface MedicationsFormFindStarted {
  type: MedicationsFormActionTypes.MEDICATIONS_FORM_FIND_STARTED;
}

interface MedicationsFormFindSuccess {
  type: MedicationsFormActionTypes.MEDICATIONS_FORM_FIND_SUCCESS;
  payload: any;
}

interface MedicationsFormFindError {
  type: MedicationsFormActionTypes.MEDICATIONS_FORM_FIND_ERROR;
}

interface MedicationsFormCreateStarted {
  type: MedicationsFormActionTypes.MEDICATIONS_FORM_CREATE_STARTED;
}

interface MedicationsFormCreateSuccess {
  type: MedicationsFormActionTypes.MEDICATIONS_FORM_CREATE_SUCCESS;
}

interface MedicationsFormCreateError {
  type: MedicationsFormActionTypes.MEDICATIONS_FORM_CREATE_ERROR;
}

interface MedicationsFormUpdateStarted {
  type: MedicationsFormActionTypes.MEDICATIONS_FORM_UPDATE_STARTED;
}

interface MedicationsFormUpdateSuccess {
  type: MedicationsFormActionTypes.MEDICATIONS_FORM_UPDATE_SUCCESS;
}

interface MedicationsFormUpdateError {
  type: MedicationsFormActionTypes.MEDICATIONS_FORM_UPDATE_ERROR;
}

export type MedicationsFormAction =
  | MedicationsFormReset
  | MedicationsFormFindStarted
  | MedicationsFormFindSuccess
  | MedicationsFormFindError
  | MedicationsFormCreateStarted
  | MedicationsFormCreateSuccess
  | MedicationsFormCreateError
  | MedicationsFormUpdateStarted
  | MedicationsFormUpdateSuccess
  | MedicationsFormUpdateError;
