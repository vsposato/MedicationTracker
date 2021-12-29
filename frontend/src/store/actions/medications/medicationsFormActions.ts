import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'store/actions/authActions';
import { toast } from 'react-toastify';
import {
  MedicationsFormAction,
  MedicationsFormActionTypes,
} from 'types/redux/medications/medicationsForm';
import { Dispatch } from 'redux';

const actions = {
  doNew: () => {
    return {
      type: MedicationsFormActionTypes.MEDICATIONS_FORM_RESET,
    };
  },

  doFind: (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: MedicationsFormActionTypes.MEDICATIONS_FORM_FIND_STARTED,
      });

      axios.get(`/medications/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: MedicationsFormActionTypes.MEDICATIONS_FORM_FIND_SUCCESS,
          payload: record,
        });
      });
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: MedicationsFormActionTypes.MEDICATIONS_FORM_FIND_ERROR,
      });

      dispatch(push('/admin/medications'));
    }
  },

  doCreate: (values: any) => async (dispatch: Dispatch<MedicationsFormAction | Function | any>) => {
    try {
      dispatch({
        type: MedicationsFormActionTypes.MEDICATIONS_FORM_CREATE_STARTED,
      });

      axios.post('/medications', { data: values }).then((res) => {
        dispatch({
          type: MedicationsFormActionTypes.MEDICATIONS_FORM_CREATE_SUCCESS,
        });

        toast.success('Medications created');
        dispatch(push('/admin/medications'));
      });
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: MedicationsFormActionTypes.MEDICATIONS_FORM_CREATE_ERROR,
      });
    }
  },

  doUpdate:
    (id: string, values: any, isProfile: boolean) =>
    async (dispatch: Dispatch<MedicationsFormAction | Function | any>) => {
      try {
        dispatch({
          type: MedicationsFormActionTypes.MEDICATIONS_FORM_UPDATE_STARTED,
        });

        await axios.put(`/medications/${id}`, { id, data: values });

        dispatch(doInit());

        dispatch({
          type: MedicationsFormActionTypes.MEDICATIONS_FORM_UPDATE_SUCCESS,
        });

        if (isProfile) {
          toast.success('Profile updated');
        } else {
          toast.success('Medications updated');
          dispatch(push('/admin/medications'));
        }
      } catch (error: any) {
        Errors.handle(error);

        dispatch({
          type: MedicationsFormActionTypes.MEDICATIONS_FORM_UPDATE_ERROR,
        });
      }
    },
};

export default actions;
