import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
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

  studentPromotionMap$academicYear: { type: 'int', db: 'academic_year' },
  [`${studentInfo.tableName}$enrolmentNumber`]: studentInfo.allColumns.enrolmentNumber,
  [`${studentInfo.tableName}$firstName`]: studentInfo.allColumns.firstName,
  [`${studentInfo.tableName}$lastName`]: studentInfo.allColumns.lastName,
  [`${studentInfo.tableName}$middleName`]: studentInfo.allColumns.middleName,
  [`${studentPromotionMap.allColumns.studId}.count`]: studentPromotionMap.allColumns.studId,

};

export const columns = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'studentPromotionMap$academicYear', key: 'studentPromotionMap$academicYear', title: 'Year', width: 100 },
    { dataIndex: 'studentPromotionMap$count', key: 'studentPromotionMap$count', title: 'Number of outgoing / final year students', width: 300 },
  ];
  return cols;
};

export const columnsStudent = (_settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', key: 'id', title: 'Sr. No' },
    { dataIndex: 'studentPromotionMap$academicYear', key: 'academicYear', title: 'Year of passing final year exam' },
    {
      dataIndex: 'studentName',
      key: 'studentName',
      title: 'Name of students',
      render: (_, record) => `${record.studentInfo$firstName} ${record.studentInfo$middleName} ${record.studentInfo$lastName}`,
    },
    { dataIndex: 'studentInfo$enrolmentNumber', key: 'studentInfo$enrolmentNumber', title: 'Enrollment number' },
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
  return JSON.stringify({ NAACStudent23: { ...data } });
};
