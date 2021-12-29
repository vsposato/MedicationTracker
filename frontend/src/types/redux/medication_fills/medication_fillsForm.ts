export interface Medication_fillsFormState {
  findLoading: boolean;
  saveLoading: boolean;
  record: null | any;
}

export enum Medication_fillsFormActionTypes {
  MEDICATION_FILLS_FORM_RESET = 'MEDICATION_FILLS_FORM_RESET',
  MEDICATION_FILLS_FORM_FIND_STARTED = 'MEDICATION_FILLS_FORM_FIND_STARTED',
  MEDICATION_FILLS_FORM_FIND_SUCCESS = 'MEDICATION_FILLS_FORM_FIND_SUCCESS',
  MEDICATION_FILLS_FORM_FIND_ERROR = 'MEDICATION_FILLS_FORM_FIND_ERROR',
  MEDICATION_FILLS_FORM_CREATE_STARTED = 'MEDICATION_FILLS_FORM_CREATE_STARTED',
  MEDICATION_FILLS_FORM_CREATE_SUCCESS = 'MEDICATION_FILLS_FORM_CREATE_SUCCESS',
  MEDICATION_FILLS_FORM_CREATE_ERROR = 'MEDICATION_FILLS_FORM_CREATE_ERROR',
  MEDICATION_FILLS_FORM_UPDATE_STARTED = 'MEDICATION_FILLS_FORM_UPDATE_STARTED',
  MEDICATION_FILLS_FORM_UPDATE_SUCCESS = 'MEDICATION_FILLS_FORM_UPDATE_SUCCESS',
  MEDICATION_FILLS_FORM_UPDATE_ERROR = 'MEDICATION_FILLS_FORM_UPDATE_ERROR',
}

interface Medication_fillsFormReset {
  type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_RESET;
}

interface Medication_fillsFormFindStarted {
  type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_FIND_STARTED;
}

interface Medication_fillsFormFindSuccess {
  type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_FIND_SUCCESS;
  payload: any;
}

interface Medication_fillsFormFindError {
  type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_FIND_ERROR;
}

interface Medication_fillsFormCreateStarted {
  type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_CREATE_STARTED;
}

interface Medication_fillsFormCreateSuccess {
  type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_CREATE_SUCCESS;
}

interface Medication_fillsFormCreateError {
  type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_CREATE_ERROR;
}

interface Medication_fillsFormUpdateStarted {
  type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_UPDATE_STARTED;
}

interface Medication_fillsFormUpdateSuccess {
  type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_UPDATE_SUCCESS;
}

interface Medication_fillsFormUpdateError {
  type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_UPDATE_ERROR;
}

export type Medication_fillsFormAction =
  | Medication_fillsFormReset
  | Medication_fillsFormFindStarted
  | Medication_fillsFormFindSuccess
  | Medication_fillsFormFindError
  | Medication_fillsFormCreateStarted
  | Medication_fillsFormCreateSuccess
  | Medication_fillsFormCreateError
  | Medication_fillsFormUpdateStarted
  | Medication_fillsFormUpdateSuccess
  | Medication_fillsFormUpdateError;
