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

import medicationsFields from 'pages/CRUD/Medications/helpers/medicationsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import UsersSelectItem from 'pages/CRUD/Users/helpers/UsersSelectItem';

import Medication_fillsSelectItem from 'pages/CRUD/Medication_fills/helpers/Medication_fillsSelectItem';

type MedicationsFormProps = {
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

const MedicationsForm = (props: MedicationsFormProps) => {
  const { isEditing, isProfile, findLoading, saveLoading, record, onSubmit, onCancel, modal } =
    props;

  const iniValues = () => {
    return IniValues(medicationsFields, record || {});
  };

  const formValidations = () => {
    return FormValidations(medicationsFields, record || {});
  };

  const handleSubmit = (values: { [rest: string]: any }) => {
    // @ts-ignore
    const { id, ...data } = PreparedValues(medicationsFields, values || {});
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    }

    return isEditing ? 'Edit Medications' : 'Add Medications';
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
            <UsersSelectItem
              name={'medication_owner'}
              schema={medicationsFields}
              showCreate={!modal}
              mode="multiple"
              form={form}
            />

            <InputFormItem name={'medication_name'} schema={medicationsFields} />

            <InputNumberFormItem name={'quantity'} schema={medicationsFields} />

            <InputNumberFormItem name={'days_supply'} schema={medicationsFields} />

            <InputNumberFormItem name={'days_before_refill'} schema={medicationsFields} />

            <Medication_fillsSelectItem
              name={'medication_fills'}
              schema={medicationsFields}
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

export default MedicationsForm;
