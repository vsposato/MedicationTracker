import Errors from 'components/FormItems/error/errors';
import axios from 'axios';
import {
  MedicationsListActionTypes,
  MedicationsListAction,
} from 'types/redux/medications/medicationsList';
import { Dispatch } from 'redux';

async function list(filter?: any) {
  const response = await axios.get(
    `/medications?page=${filter.page}&limit=${filter.limit}&medications=${
      filter.medications ? filter.medications : ''
    }`,
  );
  return response.data;
}

async function filterMedications(request: any, filter: any) {
  const response = await axios.get(
    `/medications?page=${filter.page}&limit=${filter.limit}${request}`,
  );
  return response.data;
}

const actions = {
  doFilter: (request: any, filter: any) => async (dispatch: Dispatch) => {
    try {
      const response = await filterMedications(request, filter);

      dispatch({
        type: MedicationsListActionTypes.MEDICATIONS_LIST_FILTERED,
        payload: {
          rows: response.rows,
        },
      });
    } catch (error: any) {
      Errors.handle(error);
      dispatch({
        type: MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_ERROR,
      });
    }
  },

  doFetch:
    (filter: any, keepPagination = false) =>
    async (dispatch: Dispatch) => {
      try {
        dispatch({
          type: MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_STARTED,
          payload: { filter, keepPagination },
        });

        const response = await list(filter);

        dispatch({
          type: MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error: any) {
        Errors.handle(error);

        dispatch({
          type: MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_ERROR,
        });
      }
    },

  doDelete: (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: MedicationsListActionTypes.MEDICATIONS_LIST_DELETE_STARTED,
      });

      await axios.delete(`/medications/${id}`);

      dispatch({
        type: MedicationsListActionTypes.MEDICATIONS_LIST_DELETE_SUCCESS,
      });

      const response = await list();
      dispatch({
        type: MedicationsListActionTypes.MEDICATIONS_LIST_FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: MedicationsListActionTypes.MEDICATIONS_LIST_DELETE_ERROR,
      });
    }
  },
  doOpenConfirm: (id: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: MedicationsListActionTypes.MEDICATIONS_LIST_OPEN_CONFIRM,
      payload: {
        id: id,
      },
    });
  },
  doCloseConfirm: () => async (dispatch: Dispatch) => {
    dispatch({
      type: MedicationsListActionTypes.MEDICATIONS_LIST_CLOSE_CONFIRM,
    });
  },
};

export default actions;
