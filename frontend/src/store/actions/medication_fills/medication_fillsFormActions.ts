import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'store/actions/authActions';
import { toast } from 'react-toastify';
import {
  Medication_fillsFormAction,
  Medication_fillsFormActionTypes,
} from 'types/redux/medication_fills/medication_fillsForm';
import { Dispatch } from 'redux';

const actions = {
  doNew: () => {
    return {
      type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_RESET,
    };
  },

  doFind: (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_FIND_STARTED,
      });

      axios.get(`/medication_fills/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_FIND_SUCCESS,
          payload: record,
        });
      });
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_FIND_ERROR,
      });

      dispatch(push('/admin/medication_fills'));
    }
  },

  doCreate:
    (values: any) => async (dispatch: Dispatch<Medication_fillsFormAction | Function | any>) => {
      try {
        dispatch({
          type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_CREATE_STARTED,
        });

        axios.post('/medication_fills', { data: values }).then((res) => {
          dispatch({
            type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_CREATE_SUCCESS,
          });

          toast.success('Medication_fills created');
          dispatch(push('/admin/medication_fills'));
        });
      } catch (error: any) {
        Errors.handle(error);

        dispatch({
          type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_CREATE_ERROR,
        });
      }
    },

  doUpdate:
    (id: string, values: any, isProfile: boolean) =>
    async (dispatch: Dispatch<Medication_fillsFormAction | Function | any>) => {
      try {
        dispatch({
          type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_UPDATE_STARTED,
        });

        await axios.put(`/medication_fills/${id}`, { id, data: values });

        dispatch(doInit());

        dispatch({
          type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_UPDATE_SUCCESS,
        });

        if (isProfile) {
          toast.success('Profile updated');
        } else {
          toast.success('Medication_fills updated');
          dispatch(push('/admin/medication_fills'));
        }
      } catch (error: any) {
        Errors.handle(error);

        dispatch({
          type: Medication_fillsFormActionTypes.MEDICATION_FILLS_FORM_UPDATE_ERROR,
        });
      }
    },
};

export default actions;
