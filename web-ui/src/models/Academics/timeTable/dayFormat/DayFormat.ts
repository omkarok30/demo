import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

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

  weekoff: { type: 'json', db: 'weekoff' },
  nameofFormat: { type: 'varchar', db: 'name_of_format' },
  isactive: { type: 'boolean', db: 'is_active' },
};

export const schemaRules = yup.object().shape({
  nameofFormat: yup.string().required('required'),
  weekoff: yup.mixed().required('required'),
  session: yup.string().required('required'),
  fromTime: yup.string().required('required'),
  toTime: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'session', title: 'Session' },
    { dataIndex: 'fromTime', title: 'From Time' },
    { dataIndex: 'toTime', title: 'To Time' },
  ];
  return cols;
};
export const proceedcolumns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'session', title: 'Session' },
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
  return JSON.stringify({ dayFormat: { ...data } });
};
