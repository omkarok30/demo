import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import * as employeeDetails from '@/models/Employee/EmployeeDetails';

import { convertForSubmit } from '@/utils/cast';

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

  userId: { type: 'string', db: 'type' },
  category: { type: 'string', db: 'degree_name' },
  subCategory: { type: 'string', db: 'degree_code' },

  [`${employeeDetails.tableName}$firstName`]: employeeDetails.allColumns.firstName,
  [`${employeeDetails.tableName}$middleName`]: employeeDetails.allColumns.middleName,
  [`${employeeDetails.tableName}$lastName`]: employeeDetails.allColumns.lastName,

};

export const schemaRules = yup.object().shape({
  userId: yup.mixed().required('required'),
  category: yup.string().required('required'),
  subCategory: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'category', title: 'Category' },
    { dataIndex: 'subCategory', title: 'Sub Category' },
  ];
  return cols;
};
export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ blunodecoordinators: { ...data } });
};
