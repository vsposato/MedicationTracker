import { Formik } from 'formik';
import React from 'react';
import Loader from 'components/Loader';

// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import InputNumberFormItem from 'components/FormItems/items/InputNumberFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars
import TextAreaFormItem from 'components/FormItems/items/TextAreaFormItem';
// eslint-disable-next-line no-unused-vars

import usersFields from 'pages/CRUD/Users/helpers/usersFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import MedicationsSelectItem from 'pages/CRUD/Medications/helpers/MedicationsSelectItem';

type UsersFormProps = {
  isEditing: boolean;
  isProfile: boolean;
  findLoading: boolean;
  saveLoading: boolean;
  record: {
    [rest: string]: any;
  };
  onSubmit: Function;
  onCancel: Function;
  modal?: any;
  currentUser?: any;
};

const UsersForm = (props: UsersFormProps) => {
  const { isEditing, isProfile, findLoading, saveLoading, record, onSubmit, onCancel, modal } =
    props;

  const iniValues = () => {
    return IniValues(usersFields, record || {});
  };

  const formValidations = () => {
    return FormValidations(usersFields, record || {});
  };

  const handleSubmit = (values: { [rest: string]: any }) => {
    // @ts-ignore
    const { id, ...data } = PreparedValues(usersFields, values || {});
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    }

    return isEditing ? 'Edit Users' : 'Add Users';
  };

  // @ts-ignore
  const renderForm = () => (
    <Widget title={<h4>{title()}</h4>} collapse close>
      <Formik
        onSubmit={handleSubmit}
        initialValues={iniValues()}
        validationSchema={formValidations()}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <InputFormItem name={'firstName'} schema={usersFields} autoFocus />

            <InputFormItem name={'lastName'} schema={usersFields} />

            <InputFormItem name={'phoneNumber'} schema={usersFields} />

            <InputFormItem name={'email'} schema={usersFields} />

            <RadioFormItem name={'role'} schema={usersFields} />

            <SwitchFormItem name={'disabled'} schema={usersFields} />

            <ImagesFormItem
              name={'avatar'}
              schema={usersFields}
              path={'users/avatar'}
              fileProps={{
                size: undefined,
                formats: undefined,
              }}
              max={undefined}
            />

            <MedicationsSelectItem
              name={'medications'}
              schema={usersFields}
              showCreate={!modal}
              form={form}
            />

            <div className="form-buttons">
              <button
                className="btn btn-primary"
                disabled={saveLoading}
                type="button"
                // @ts-ignore
                onClick={(e: React.FormEvent<HTMLFormElement>) => form.handleSubmit(e)}
              >
                Save
              </button>{' '}
              <button
                className="btn btn-light"
                type="button"
                disabled={saveLoading}
                onClick={form.handleReset}
              >
                Reset
              </button>{' '}
              <button
                className="btn btn-light"
                type="button"
                disabled={saveLoading}
                onClick={() => onCancel()}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Widget>
  );

  if (findLoading) {
    return <Loader />;
  }

  if (isEditing && !record) {
    return <Loader />;
  }

  return renderForm();
};

export default UsersForm;
