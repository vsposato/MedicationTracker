import axios from 'axios';
import React from 'react';
import AutocompleteFormItem from 'components/FormItems/items/AutocompleteFormItem';
import { connect } from 'react-redux';
import { Medication_fillsSelectItemProps } from '../../../../types/formik/medication_fills/medication_fillsSelectItem';

async function selectList(query: string, limit: number) {
  const params = { query, limit };
  const response = await axios.get(`/medication_fills/autocomplete`, { params });
  return response.data;
}

const Medication_fillsSelectItem = (props: Medication_fillsSelectItemProps) => {
  const fetchToItem = (value: any, limit: number) => {
    return selectList(value, limit);
  };

  const mapper = {
    intoSelect(originalValue: Medication_fillsSelectItemProps) {
      if (!originalValue) {
        return undefined;
      }

      const value = originalValue.id;
      let label = originalValue.label ? originalValue.label : originalValue.medication_id;

      return {
        key: value,
        value,
        label,
      };
    },

    intoValue(originalValue: Medication_fillsSelectItemProps) {
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
  hasPermissionToCreate: state.medication_fills.hasPermissionToCreate,
});

export default connect(select)(Medication_fillsSelectItem);
