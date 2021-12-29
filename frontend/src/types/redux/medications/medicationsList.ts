export interface MedicationsListState {
  rows: {
    [key: string]: any;
  }[];
  loading: boolean;
  count: number;
  modalOpen: boolean;
  idToDelete: null | string;
}

export enum MedicationsListActionTypes {
  MEDICATIONS_LIST_FILTERED = 'MEDICATIONS_LIST_FILTERED',
  MEDICATIONS_LIST_FETCH_STARTED = 'MEDICATIONS_LIST_FETCH_STARTED',
  MEDICATIONS_LIST_FETCH_SUCCESS = 'MEDICATIONS_LIST_FETCH_SUCCESS',
  MEDICATIONS_LIST_FETCH_ERROR = 'MEDICATIONS_LIST_FETCH_ERROR',
  MEDICATIONS_LIST_DELETE_STARTED = 'MEDICATIONS_LIST_DELETE_STARTED',
  MEDICATIONS_LIST_DELETE_SUCCESS = 'MEDICATIONS_LIST_DELETE_SUCCESS',
  MEDICATIONS_LIST_DELETE_ERROR = 'MEDICATIONS_LIST_DELETE_ERROR',
  MEDICATIONS_LIST_OPEN_CONFIRM = 'MEDICATIONS_LIST_OPEN_CONFIRM',
  MEDICATIONS_LIST_CLOSE_CONFIRM = 'MEDICATIONS_LIST_CLOSE_CONFIRM',
}

interface MedicationsListFiltered {
  type: MedicationsListActionTypes.MEDICATIONS_LIST_FILTERED;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number;
  };
}

interface MedicationsListFetchStarted {
  type: MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_STARTED;
}

interface MedicationsListFetchSuccess {
  type: MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_SUCCESS;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number;
  };
}

interface MedicationsListFetchError {
  type: MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_ERROR;
}

interface MedicationsListDeleteStarted {
  type: MedicationsListActionTypes.MEDICATIONS_LIST_DELETE_STARTED;
}

interface MedicationsListDeleteSuccess {
  type: MedicationsListActionTypes.MEDICATIONS_LIST_DELETE_SUCCESS;
}

interface MedicationsListDeleteError {
  type: MedicationsListActionTypes.MEDICATIONS_LIST_DELETE_ERROR;
}

interface MedicationsListOpenConfirm {
  type: MedicationsListActionTypes.MEDICATIONS_LIST_OPEN_CONFIRM;
  payload: {
    id: string;
  };
}

interface MedicationsListCloseConfirm {
  type: MedicationsListActionTypes.MEDICATIONS_LIST_CLOSE_CONFIRM;
}

export type MedicationsListAction =
  | MedicationsListFiltered
  | MedicationsListFetchStarted
  | MedicationsListFetchSuccess
  | MedicationsListFetchError
  | MedicationsListDeleteStarted
  | MedicationsListDeleteSuccess
  | MedicationsListDeleteError
  | MedicationsListOpenConfirm
  | MedicationsListCloseConfirm;
