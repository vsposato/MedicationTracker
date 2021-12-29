export interface Medication_fillsListState {
  rows: {
    [key: string]: any;
  }[];
  loading: boolean;
  count: number;
  modalOpen: boolean;
  idToDelete: null | string;
}

export enum Medication_fillsListActionTypes {
  MEDICATION_FILLS_LIST_FILTERED = 'MEDICATION_FILLS_LIST_FILTERED',
  MEDICATION_FILLS_LIST_FETCH_STARTED = 'MEDICATION_FILLS_LIST_FETCH_STARTED',
  MEDICATION_FILLS_LIST_FETCH_SUCCESS = 'MEDICATION_FILLS_LIST_FETCH_SUCCESS',
  MEDICATION_FILLS_LIST_FETCH_ERROR = 'MEDICATION_FILLS_LIST_FETCH_ERROR',
  MEDICATION_FILLS_LIST_DELETE_STARTED = 'MEDICATION_FILLS_LIST_DELETE_STARTED',
  MEDICATION_FILLS_LIST_DELETE_SUCCESS = 'MEDICATION_FILLS_LIST_DELETE_SUCCESS',
  MEDICATION_FILLS_LIST_DELETE_ERROR = 'MEDICATION_FILLS_LIST_DELETE_ERROR',
  MEDICATION_FILLS_LIST_OPEN_CONFIRM = 'MEDICATION_FILLS_LIST_OPEN_CONFIRM',
  MEDICATION_FILLS_LIST_CLOSE_CONFIRM = 'MEDICATION_FILLS_LIST_CLOSE_CONFIRM',
}

interface Medication_fillsListFiltered {
  type: Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_FILTERED;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number;
  };
}

interface Medication_fillsListFetchStarted {
  type: Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_FETCH_STARTED;
}

interface Medication_fillsListFetchSuccess {
  type: Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_FETCH_SUCCESS;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number;
  };
}

interface Medication_fillsListFetchError {
  type: Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_FETCH_ERROR;
}

interface Medication_fillsListDeleteStarted {
  type: Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_DELETE_STARTED;
}

interface Medication_fillsListDeleteSuccess {
  type: Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_DELETE_SUCCESS;
}

interface Medication_fillsListDeleteError {
  type: Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_DELETE_ERROR;
}

interface Medication_fillsListOpenConfirm {
  type: Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_OPEN_CONFIRM;
  payload: {
    id: string;
  };
}

interface Medication_fillsListCloseConfirm {
  type: Medication_fillsListActionTypes.MEDICATION_FILLS_LIST_CLOSE_CONFIRM;
}

export type Medication_fillsListAction =
  | Medication_fillsListFiltered
  | Medication_fillsListFetchStarted
  | Medication_fillsListFetchSuccess
  | Medication_fillsListFetchError
  | Medication_fillsListDeleteStarted
  | Medication_fillsListDeleteSuccess
  | Medication_fillsListDeleteError
  | Medication_fillsListOpenConfirm
  | Medication_fillsListCloseConfirm;
