import axios from 'axios';
import React from 'react';
import AutocompleteFormItem from 'components/FormItems/items/AutocompleteFormItem';
import { connect } from 'react-redux';
import { MedicationsSelectItemProps } from '../../../../types/formik/medications/medicationsSelectItem';

async function selectList(query: string, limit: number) {
  const params = { query, limit };
  const response = await axios.get(`/medications/autocomplete`, { params });
  return response.data;
}

const MedicationsSelectItem = (props: MedicationsSelectItemProps) => {
  const fetchToItem = (value: any, limit: number) => {
    return selectList(value, limit);
  };

  const mapper = {
    intoSelect(originalValue: MedicationsSelectItemProps) {
      if (!originalValue) {
        return undefined;
      }

      const value = originalValue.id;
      let label = originalValue.label ? originalValue.label : originalValue.medication_owner;

      return {
        key: value,
        value,
        label,
      };
    },

    intoValue(originalValue: MedicationsSelectItemProps) {
      if (!originalValue) {
        return undefined;
      }

      return {
        id: originalValue.value,
        label: originalValue.label,
      };
    },
  };

  const { form, ...rest } = props;

  return (
    <React.Fragment>
      <AutocompleteFormItem {...rest} fetchFn={fetchToItem} mapper={mapper} form={form} />
    </React.Fragment>
  );
};

const select = (state: { [rest: string]: any }) => ({
  hasPermissionToCreate: state.medications.hasPermissionToCreate,
});

export default connect(select)(MedicationsSelectItem);
