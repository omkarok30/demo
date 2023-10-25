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

  voterIdNumber: { type: 'string', db: 'voterid_Number' },
  voterIdDob: { type: 'date', db: 'voterid_dob' },
  voterIdName: { type: 'string', db: 'voterid_name' },
  voterIdFatherName: { type: 'string', db: 'voterid_father_name' },
  voterIdDocument: { type: 'string', db: 'voterid_document' },
};

export const schemaRules = yup.object().shape({
  voterIdNumber: yup.string().required().nullable(),
  voterIdDob: yup.string().required().test('future-date', 'Date of birth cannot be in the future', (value) => {
    // use moment to check if the selected date is after the current date
    return moment(value).isSameOrBefore(moment());
  }).nullable(),
  voterIdName: yup.string().required().nullable(),
  voterIdFatherName: yup.string().required().nullable(),
  voterIdDocument: yup.string().required().nullable(),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'voterIdNumber', title: 'Voter Id Number' },
    { dataIndex: 'voterIdName', title: 'Name' },
    { dataIndex: 'voterIdDob', title: 'Date of birth' },
    { dataIndex: 'voterIdFatherName', title: 'Parent\'s/Husband\'s Name' },
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
