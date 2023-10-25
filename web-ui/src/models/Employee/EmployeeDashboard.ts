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
  department: { type: 'integer', db: 'department' },
  departmentCode: { type: 'string', db: 'department_code' },
  teachingStaff: { type: 'integer', db: 'teching_staff' },
  nonteachingStaff: { type: 'integer', db: 'nonteching_staff' },
  total: { type: 'integer', db: 'total' },
  inactive: { type: 'boolean', db: 'in_active' },
  name: { type: 'string', db: 'employee_name' },
  code: { type: 'string', db: 'employee_code' },
  designation: { type: 'string', db: 'designation' },
  position: { type: 'string', db: 'emp_position' },
  type: { type: 'string', db: 'employee_type' },
  dateofjoining: { type: 'date', db: 'date_of_joining' },
  dateofleaving: { type: 'date', db: 'date_of_leaving' },
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  department: yup.string(),
  departmentCode: yup.string().required('required'),
  teachingStaff: yup.string(),
  nonteachingStaff: yup.string().required('required'),
  total: yup.string().required('required'),
  name: yup.string().required('required'),
  code: yup.string().required('required'),
  designation: yup.string().required('required'),
  position: yup.string().required('required'),
  type: yup.string().required('required'),
  dateofjoining: yup.string().required('required'),
  dateofleaving: yup.string().required('required'),

});
export const Academiccolumns = (settings: any) => {
  const cols: ColumnsType<any> = [
    {
      dataIndex: 'department',
      title: 'Department',
    },
    { dataIndex: 'departmentCode', title: 'Department Code' },
    { dataIndex: 'teachingStaff', title: 'No. of Teaching Staff' },
    { dataIndex: 'nonteachingStaff', title: 'No. of Non-teaching Staff' },
    { dataIndex: 'total', title: 'Total Staff' },
  ];
  return cols;
};

export const Administrativecolumns = (settings: any) => {
  const cols: ColumnsType<any> = [
    {
      dataIndex: 'department',
      title: 'Department',
    },
    { dataIndex: 'departmentCode', title: 'Department Code' },

    { dataIndex: 'nonteachingStaff', title: 'No. of Non-teaching St' },
    { dataIndex: 'total', title: 'Total Staff' },
  ];
  return cols;
};
export const overallcolumns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'teachingStaff', title: 'No. of Teaching Staff' },

    { dataIndex: 'nonteachingStaff', title: 'No. of Non-teaching St' },
    { dataIndex: 'total', title: 'Total Staff' },
  ];
  return cols;
};
export const EmployeeDetailscolumn = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'name', title: 'Employee Name' },
    { dataIndex: 'code', title: 'Employee Code' },
    { dataIndex: 'designation', title: 'Designation' },
    { dataIndex: 'position', title: 'Position' },
    { dataIndex: 'type', title: 'Employee Type' },
    { dataIndex: 'dateofjoining', title: 'Date of Joining' },
    { dataIndex: 'dateofleaving', title: 'Date of Leaving' },
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
  return JSON.stringify({ employeeAddress: { ...data } });
};
