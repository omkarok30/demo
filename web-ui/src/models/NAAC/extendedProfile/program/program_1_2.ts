import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { convertForSubmit } from '@/utils/cast';
import * as degreeProgramme from '@/models/settings/ProgramDetails';

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
  [`${degreeProgramme.tableName}$programCode`]: degreeProgramme.allColumns.programCode,
  [`${degreeProgramme.tableName}$programmeName`]: degreeProgramme.allColumns.programmeName,
  [`${degreeProgramme.tableName}$startYear`]: degreeProgramme.allColumns.startYear,
};

export const columns = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', key: 'academicYear', title: 'Year', width: 100 },
    { dataIndex: 'degreeProgramme$count', key: 'degreeProgramme$count', title: 'Number of programs offered', width: 300 },
  ];
  return cols;
};

export const columnsCourse = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', key: 'id', title: 'Sr. No' },
    { dataIndex: 'degreeProgramme$programmeName', key: 'degreeProgramme$programmeName', title: 'Program Name' },
    { dataIndex: 'degreeProgramme$programCode', key: 'degreeProgramme$programCode', title: 'Program Code' },
    { dataIndex: 'degreeProgramme$startYear', key: 'degreeProgramme$startYear', title: 'Commencement Year' },
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
  return JSON.stringify({ NAACProgram12: { ...data } });
};
