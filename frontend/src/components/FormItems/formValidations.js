import moment from 'moment';
import * as yup from 'yup';

const formValidations = (fields, record = {}) => {
  const yupArray = {};
  Object.keys(fields).forEach((field) => {
    const type = fields[field].type;
    const label = fields[field].label;
    const required = fields[field].required;
    let yupConds = {};
    switch (type) {
      case 'boolean':
        yupConds = yup
          .bool()
          .default(false)
          .required(required || false);
        break;

      case 'date':
        yupConds = yup
          .mixed()
          .nullable(true)
          .required(required || false)
          .test('is-date', '', (value) => {
            if (!value) {
              return true;
            }
            return moment(value, 'YYYY-MM-DD').isValid();
          });
        break;

      case 'datetime':
        yupConds = yup
          .mixed()
          .nullable(true)
          .required(required || false);
        break;

      case 'decimal':
        yupConds = yup
          .number()
          .nullable(true)
          .required(required || false);
        break;

      case 'enum':
        yupConds = yup
          .string()
          .nullable(true)
          .required(required || false);
        break;

      case 'files':
        yupConds = yup
          .array()
          .compact()
          .ensure()
          .nullable(true)
          .required(required || false);
        break;

      case 'images':
        yupConds = yup
          .array()
          .nullable(true)
          .required(required || false);
        break;

      case 'int':
        yupConds = yup
          .number()
          .integer()
          .required(required || false)
          .nullable(true);
        break;

      case 'user_many':
      case 'relation_many':
        yupConds = yup.array().nullable(true);
        break;

      case 'user_one':
      case 'relation_one':
        yupConds = yup
          .mixed()
          .required(required || false)
          .nullable(true);
        break;

      case 'stringArray':
        yupConds = yup
          .array()
          .compact()
          .ensure()
          .required(required || false)
          .of(yup.string().trim());
        break;

      case 'string':
        yupConds = yup
          .string()
          .nullable(true)
          .required(required || false)
          .trim();
        break;

      default:
        yupConds = yup.string().required(required || false);
    }
    yupConds = yupConds.label(label);
    if (required) {
      yupConds = yupConds.required();
    }
    yupArray[field] = yupConds;
  });
  return yup.object().shape(yupArray);
};

export default formValidations;
