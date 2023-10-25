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
  // This record should be fetched from student record beneficiery details
  academicYear: { type: 'string', db: 'academic_year' },
  professional_details$count: { type: 'string', db: 'professional_details' },
  faculty_fulltime$count: { type: 'string', db: 'faculty' },
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  academicYear: yup.string().required('required'),
  professional_details$count: yup.string().required('required'),
  faculty_fulltime$count: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', title: 'Year', width: 100 },
    { dataIndex: 'professional_details$count', title: 'Number of of teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies' },
    { dataIndex: 'faculty_fulltime$count', title: 'Number of Full time Teachers' },
  ];
  return cols;
};

export const columnsFInancialReport = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr. No', width: 100 },
    {
      dataIndex: 'employee_info',
      title: 'Name of teacher',
      render: (_, record) => {
        return `${record.employee_info$firstName} ${record.employee_info$middleName} ${record.employee_info$firstName}`;
      },
    },
    { dataIndex: 'employee_sttp_details$programDetails', title: 'Name of conference/ workshop attended for which financial support provided' },
    {
      dataIndex: 'employee_sttp_details$workshop',
      title: 'Name of the professional body for which membership fee is provided',
      render: (_, record) => {
        return record?.employee_sttp_details$workshop ? record?.employee_sttp_details$workshop : '-';
      },
    },
    { dataIndex: 'amount', title: 'Amount of support received (in INR)', width: 200 },

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
  return JSON.stringify({ NAACCriteria634: { ...data } });
};
