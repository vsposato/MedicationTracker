import React, { useEffect } from 'react';
import MedicationsWidget from 'pages/CRUD/Medications/page/MedicationsWidget';
import actions from 'store/actions/medications/medicationsFormActions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useParams } from 'react-router';

const MedicationsViewPage = () => {
  const loading = useTypedSelector((store) => store.users.form.findLoading);
  const record = useTypedSelector((store) => store.users.form.record);
  const dispatch = useDispatch();
  const { id } = useParams<any>();

  useEffect(() => {
    dispatch(actions.doFind(id));
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <MedicationsWidget loading={loading} record={record} />
    </React.Fragment>
  );
};

export default MedicationsViewPage;
