import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { convertForSubmit } from '@/utils/cast';
import * as studentPromotionMap from '@/models/promotion/studentPromotionMap';
import * as studentInfo from '@/models/admissions/studentRecords/StudentInfo';

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
  [`${studentPromotionMap.allColumns.studId}.count`]: studentPromotionMap.allColumns.studId,
  [`${studentInfo.tableName}$firstName`]: studentInfo.allColumns.firstName,
  [`${studentInfo.tableName}$lastName`]: studentInfo.allColumns.lastName,
  [`${studentInfo.tableName}$middleName`]: studentInfo.allColumns.middleName,
  [`${studentInfo.tableName}$programId`]: studentInfo.allColumns.programId,
  nameOfEmployer: { type: 'string', db: 'name_of_employer' },
  package: { type: 'string', db: 'pakcage' },
  document: { type: 'string', db: 'document' },
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  academicYear: yup.string().required('required'),
  placement$count: yup.string().required('required'),
  studentPromotionMap$count: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', key: 'academicYear', title: 'Year', width: 100 },
    { dataIndex: 'placement$count', key: 'placement$count', title: 'Number of outgoing students placed', width: 300 },
    { dataIndex: 'studentPromotionMap$count', key: 'studentPromotionMap$count', title: 'Number of outgoing students', width: 300 },
  ];
  return cols;
};

export const columnsPlacements = (settings: any) => {
  const naac_version = settings.get('naac_version') || [];
  const cols: ColumnsType<any> = [
    { title: 'Sr. No.', dataIndex: 'id' },
    {
      dataIndex: 'studentName',
      key: 'studentName',
      title: 'Name of Student placed and contact details',
      render: (_, record) => {
        return `${record.studentInfo$firstName} ${record.studentInfo$middleName} ${record.studentInfo$firstName}`;
      },
    },
    {
      title: 'Program graduated from',
      dataIndex: 'studentInfo$programId',
      key: 'studentInfo$programId',
    },
    {
      title: 'Name of the employer with contact details',
      dataIndex: 'nameOfEmployer',
      key: 'nameOfEmployer',
    },
    {
      title: 'Pay package at appointment (In INR per annum)',
      dataIndex: 'package',
      key: 'package',
    },
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
  return JSON.stringify({ NAACCriteria521: { ...data } });
};
