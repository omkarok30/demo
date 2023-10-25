import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
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

  academicYear: { type: 'int', db: 'academic_year' },
  number: { type: 'int', db: 'number' },
  type: { type: 'string', db: 'type' },
};

export const columns = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', key: 'academicYear', title: 'Year', width: 100 },
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
  return JSON.stringify({ NAACInstitute41: { ...data } });
};
