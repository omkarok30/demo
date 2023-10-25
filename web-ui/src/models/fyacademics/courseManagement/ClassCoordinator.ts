import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

import * as divisions from './Divisions';
import * as employee_info from '@/models/Employee/EmployeeDetails';
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

  degreeLevel: { type: 'string', db: 'degree_level' },
  className: { type: 'string', db: 'class_name' },
  academicYear: { type: 'integer', db: 'academic_year' },
  division: { type: 'string', db: 'division' },
  semester: { type: 'string', db: 'semester' },
  userId: { type: 'string', db: 'user_id' },
  departmentId: { type: 'string', db: 'department_id' },
  programmeNameId: { type: 'string', db: 'programme_name_id' },
  isFY: { type: 'bool', db: 'is_fy' },

  // foreign key data at the end
  [`${divisions.tableName}$division`]: divisions.allColumns.division,
  [`${employee_info.tableName}$firstName`]: employee_info.allColumns.firstName,
  [`${employee_info.tableName}$middleName`]: employee_info.allColumns.middleName,
  [`${employee_info.tableName}$lastName`]: employee_info.allColumns.lastName,

};

export const schemaRules = yup.object().shape({
  userId: yup.string().required('required'),

});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'divisions$division', title: 'Division' },

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
  return JSON.stringify({ classcoordinators: { ...data } });
};
