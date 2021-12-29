import React, { useEffect } from 'react';
import Medication_fillsWidget from 'pages/CRUD/Medication_fills/page/Medication_fillsWidget';
import actions from 'store/actions/medication_fills/medication_fillsFormActions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useParams } from 'react-router';

const Medication_fillsViewPage = () => {
  const loading = useTypedSelector((store) => store.users.form.findLoading);
  const record = useTypedSelector((store) => store.users.form.record);
  const dispatch = useDispatch();
  const { id } = useParams<any>();

  useEffect(() => {
    dispatch(actions.doFind(id));
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <Medication_fillsWidget loading={loading} record={record} />
    </React.Fragment>
  );
};

export default Medication_fillsViewPage;
