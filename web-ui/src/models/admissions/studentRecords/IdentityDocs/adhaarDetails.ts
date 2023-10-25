import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import moment from 'moment';

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

  adhaarNumber: { type: 'string', db: 'adhaar_number' },
  adhaarDob: { type: 'date', db: 'adhaar_dob' },
  adhaarName: { type: 'string', db: 'adhaar_name' },
  adhaarAddress: { type: 'string', db: 'adhaar_address' },
  adhaarFatherName: { type: 'string', db: 'adhaar_father_name' },
  adhaarDocument: { type: 'string', db: 'adhaar_document' },
};

export const schemaRules = yup.object().shape({
  adhaarNumber: yup.string().required().nullable(),
  adhaarDob: yup.string().required().test('future-date', 'Date of birth cannot be in the future', (value) => {
    // use moment to check if the selected date is after the current date
    return moment(value).isSameOrBefore(moment());
  }).nullable(),
  adhaarName: yup.string().required().nullable(),
  adhaarAddress: yup.string().required().nullable(),
  adhaarFatherName: yup.string().required('required').nullable(),
  adhaarDocument: yup.string(),
});
export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'adhaarNumber', title: 'Adhaar Number' },
    { dataIndex: 'adhaarDob', title: 'Date of Birth' },
    { dataIndex: 'adhaarName', title: 'Name' },
    { dataIndex: 'adhaarAddress', title: 'Address' },
    { dataIndex: 'adhaarFatherName', title: 'Father\'s/Husband\'s Name' },
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
