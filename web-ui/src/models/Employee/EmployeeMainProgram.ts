import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
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
  empId: { type: 'string', db: 'emp_id' },
  programId: { type: 'string', db: 'program_id' },
  fromYear: { type: 'integer', db: 'from_year' },
  toYear: { type: 'integer', db: 'to_year' },
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empId: yup.string().required('required'),
  programId: yup.string().required('required'),
  fromYear: yup.string().required('required'),
  toYear: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
    if (parseInt(formValues.fromYear) > parseInt(formValues.toYear)) {
      return schema.test('failed', 'should be greater than from year', (value, { createError }) => {
        return false;
      });
    }

    return schema.required('required');
  }),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'programId', title: 'Program' },
    { dataIndex: 'fromYear', title: 'From Year' },
    { dataIndex: 'toYear', title: 'To Year' },
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
  return JSON.stringify({ MainProgramDetails: { ...data } });
};
