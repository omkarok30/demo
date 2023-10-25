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

  panNumber: { type: 'string', db: 'pan_number' },
  panName: { type: 'string', db: 'pan_name' },
  panDob: { type: 'date', db: 'pan_dob' },
  panParentName: { type: 'string', db: 'pan_parent_name' },
  panDocument: { type: 'string', db: 'pan_document' },
};

export const schemaRules = yup.object().shape({
  panNumber: yup.string().required().nullable(),
  panName: yup.string().required().nullable(),
  panDob: yup.string().required().test('future-date', 'Date of birth cannot be in the future', (value) => {
    // use moment to check if the selected date is after the current date
    return moment(value).isSameOrBefore(moment());
  }).nullable(),
  panParentName: yup.string().required().nullable(),
  panDocument: yup.string().required().nullable(),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'panNumber', title: 'Permanent Account Number' },
    { dataIndex: 'panName', title: 'Name' },
    { dataIndex: 'panDob', title: 'Date of birth' },
    { dataIndex: 'panParentName', title: 'Parent\'s/Spous\'s Name' },
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
