import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import moment from 'moment';
import * as yup from 'yup';

export const allColumns = {
  id: { type: 'string', db: 'id' },
  version: { type: 'integer', db: 'version' },
  createdAt: { type: 'date', db: 'created_at' },
  createdBy: { type: 'string', db: 'created_by' },
  updatedAt: { type: 'date', db: 'updated_at' },
  updatedBy: { type: 'string', db: 'updated_by' },
  deletedAt: { type: 'date', db: 'deleted_at' },
  deletedBy: { type: 'string', db: 'deleted_by' },
  props: { type: 'json', db: 'props' },

  dlNumber: { type: 'string', db: 'dl_number' },
  dlName: { type: 'string', db: 'dl_name' },
  dlDob: { type: 'date', db: 'dl_dob' },
  dlFatherName: { type: 'string', db: 'dl_father_name' },
  dlExpiryDate: { type: 'date', db: 'dl_expiry_date' },
  dlDocument: { type: 'string', db: 'dl_document' },
};

export const schemaRules = yup.object().shape({
  dlNumber: yup.string().required().nullable(),
  dlName: yup.string().required().nullable(),
  dlDob: yup.string().required().test('future-date', 'Date of birth cannot be in the future', (value) => {
    return moment(value).isSameOrBefore(moment());
  }).nullable(),
  dlFatherName: yup.string().required().nullable(),

  dlExpiryDate: yup.mixed()
  .when(['$formValues', '$settings'], (formValues, settings, schema) => {
    if (!moment(formValues.dlExpiryDate).isAfter(formValues.dlDob)) {
      return schema.test('failed', 'Expiry date must be after date of birth', (value, { createError }) => {
        return false;
      });
    }
    return schema.notRequired();
  }).nullable(),

  dlDocument: yup.string().required().nullable(),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'dlNumber', title: 'License Number' },
    { dataIndex: 'dlName', title: 'Name' },
    { dataIndex: 'dlDob', title: 'Date of Birth' },
    { dataIndex: 'dlFatherName', title: 'Father\'s Name/ Husband\'s Name' },
    { dataIndex: 'dlExpiryDate', title: 'Expire\'s On' },
  ];
  return cols;
};

export const submitJSON = (values: any, modelOnly = true) => {
  const data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  return JSON.stringify(data);
};
