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
  numberOfSeats: { type: 'int', db: 'number_of_seats' },
  category: { type: 'bytea', db: 'category' },
};

export const columns = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', key: 'academicYear', title: 'Year', width: 100 },
    { dataIndex: 'numberOfSeats', key: 'numberOfSeats', title: 'Number of seats earmarked for reserved category as per GOI/State Govt rule', width: 300 },
  ];
  return cols;
};

export const columnsStudent = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'category', key: 'category', title: 'Reserved Category Name' },
    { dataIndex: 'numberOfSeats', key: 'numberOfSeats', title: 'Number of seats earmarked' },
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
  return JSON.stringify({ NAACStudent22: { ...data } });
};
