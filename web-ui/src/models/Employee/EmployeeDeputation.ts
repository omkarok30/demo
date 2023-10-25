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
  to_date: { type: 'date', db: 'to_date' },
  deputation_date: { type: 'date', db: 'deputation_date' },
  degree_id: { type: 'string', db: 'degree_id' },
  description: { type: 'string', db: 'description' },
  document: { type: 'string', db: 'document' },
  status: { type: 'string', db: 'status' },
  is_freezed: { type: 'string', db: 'is_freezed' },
  deactivatereason: { type: 'string', db: 'deactivate_reason' },

};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empCode: yup.string(),
  deputation_date: yup.mixed().required('required'),
  to_date: yup.string(),
  description: yup.string(),
  document: yup.string(),
  status: yup.string(),
  deactivatereason: yup.string(),

});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    // { dataIndex: 'id', title: 'Sr.No',responsive: ['md']},
    { dataIndex: 'deputation_date', title: 'Deputation Date', responsive: ['md'] },
    { dataIndex: 'description', title: 'Description', responsive: ['md'] },
    { dataIndex: 'to_date', title: 'To Date', responsive: ['md'] },
  ];
  return cols;
};
export const columns1 = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'status', title: 'Employment Status', responsive: ['md'] },
    { dataIndex: 'deactivatereason', title: 'Reason for Deactivation', responsive: ['md'] },
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
  return JSON.stringify({ employeeDetails: { ...data } });
};
