import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { convertForSubmit } from '@/utils/cast';
import * as degreeProgramme from '@/models/settings/ProgramDetails';
import * as degreeCourse from '@/models/Academics/courseManagement/manageCourses/ManageCourses';

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

  courseFacultyLinking$academicYear: { type: 'int', db: 'academic_year' },
  courseFacultyLinking$count: { type: 'int', db: 'facalty' },
  [`${degreeProgramme.tableName}$programCode`]: degreeProgramme.allColumns.programCode,
  [`${degreeProgramme.tableName}$programmeName`]: degreeProgramme.allColumns.programmeName,
  [`${degreeProgramme.tableName}$yearOfImpl`]: degreeProgramme.allColumns.yearOfImpl,
  [`${degreeCourse.tableName}$code`]: degreeCourse.allColumns.code,
};

export const columns = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'courseFacultyLinking$academicYear', key: 'courseFacultyLinking$academicYear', title: 'Year', width: 100 },
    { dataIndex: 'courseFacultyLinking$count', key: 'courseFacultyLinking$count', title: 'Number of courses offered by the institution across all programs', width: 300 },
  ];
  return cols;
};

export const columnsCourse = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', key: 'id', title: 'Sr. No' },
    { dataIndex: 'courseFacultyLinking$programCode', key: 'courseFacultyLinking$programCode', title: 'Program code' },
    { dataIndex: 'courseFacultyLinking$programId', key: 'courseFacultyLinking$programId', title: 'Program Name' },
    { dataIndex: 'courses$code', key: 'courses$code', title: 'Course code' },
    { dataIndex: 'courses$name', key: 'courses$name', title: 'Course Name' },
    { dataIndex: 'courses$introductionYear', key: 'courses$introductionYear', title: 'Year of introduction' },
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
  return JSON.stringify({ NAACProgram1: { ...data } });
};
