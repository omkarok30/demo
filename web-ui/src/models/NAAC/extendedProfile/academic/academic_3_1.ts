import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { convertForSubmit } from '@/utils/cast';
import * as employeeInfo from '@/models/Employee/EmployeeDetails';

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
  employeeInfo$count: { type: 'int', db: 'emp_id' },
  [`${employeeInfo.tableName}$firstName`]: employeeInfo.allColumns.firstName,
  [`${employeeInfo.tableName}$middleName`]: employeeInfo.allColumns.middleName,
  [`${employeeInfo.tableName}$lastName`]: employeeInfo.allColumns.lastName,
  [`${employeeInfo.tableName}$aadhar`]: employeeInfo.allColumns.aadhar,
  [`${employeeInfo.tableName}$email`]: employeeInfo.allColumns.email,
  [`${employeeInfo.tableName}$gender`]: employeeInfo.allColumns.gender,
  [`${employeeInfo.tableName}$designation`]: employeeInfo.allColumns.designation,
  [`${employeeInfo.tableName}$joiningDate`]: employeeInfo.allColumns.joiningDate,
};

export const columns = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', key: 'academicYear', title: 'Year', width: 100 },
    { dataIndex: 'employeeInfo$count', key: 'employeeInfo$count', title: 'Number of full time teachers', width: 300 },
  ];
  return cols;
};

export const columnsTeacher = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', key: 'id', title: 'Sr. No' },
    {
      dataIndex: 'employeeName',
      key: 'employeeName',
      title: 'Name',
      render: (_, record) => `${record.employeeInfo$firstName} ${record.employeeInfo$middleName} ${record.employeeInfo$lastName}`,
    },
    { dataIndex: 'employeeInfo$aadhar', key: 'employeeInfo$aadhar', title: 'ID number/Aadhar number (not mandatory)' },
    { dataIndex: 'employeeInfo$email', key: 'employeeInfo$email', title: 'Email' },
    { dataIndex: 'employeeInfo$gender', key: 'employeeInfo$gender', title: 'Gender' },
    { dataIndex: 'employeeInfo$designation', key: 'employeeInfo$designation', title: 'Designation' },
    { dataIndex: 'employeeInfo&dateOfJoining', key: 'employeeInfo&dateOfJoining', title: 'Date of joining institution' },
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
  return JSON.stringify({ NAACAcademic31: { ...data } });
};
