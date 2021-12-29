import React from 'react';
import ChangePasswordForm from 'pages/CRUD/ChangePassword/ChangePasswordForm';
import { push } from 'connected-react-router';
import actions from 'store/actions/passwordActions';
import { connect } from 'react-redux';

const ChangePasswordFormPage = (props) => {
  const { findLoading, saveLoading, dispatch } = props;

  const doSubmit = (data) => {
    dispatch(actions.doChangePassword(data));
  };

  return (
    <React.Fragment>
      <ChangePasswordForm
        saveLoading={saveLoading}
        findLoading={findLoading}
        onSubmit={doSubmit}
        onCancel={() => dispatch(push('/app/dashboard'))}
      />
    </React.Fragment>
  );
};

function mapStateToProps(store) {
  return {
    findLoading: store.users.form.findLoading,
    saveLoading: store.users.form.saveLoading,
  };
}

export default connect(mapStateToProps)(ChangePasswordFormPage);
