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
  nameOfInstitution: { type: 'string', db: 'name_of_institution' },
  nameOfProgrammeAdmitted: { type: 'string', db: 'name_of_programme_admitted' },
  document: { type: 'string', db: 'document' },
  progressing$count: { type: 'string', db: 'progressing' },
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  academicYear: yup.string().required('required'),
  nameOfInstitution: yup.string().required('required'),
  nameOfProgrammeAdmitted: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', key: 'academicYear', title: 'Year', width: 100 },
    { dataIndex: 'progressing$count', key: 'progressing$count', title: 'Number of outgoing students placed', width: 300 },
    { dataIndex: 'studentPromotionMap$count', key: 'studentPromotionMap$count', title: 'Number of outgoing students', width: 300 },
  ];
  return cols;
};

export const columnsProgression = (settings: any) => {
  const naac_version = settings.get('naac_version') || [];
  const cols: ColumnsType<any> = [
    { title: 'Sr. No.', dataIndex: 'id' },
    {
      dataIndex: 'studentName',
      key: 'studentName',
      title: 'Name of student enrolling into higher education',
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
      title: 'Name of institution joined',
      dataIndex: 'nameOfInstitution',
      key: 'nameOfInstitution',
    },
    {
      title: 'Name of programme admitted to',
      dataIndex: 'nameOfProgrammeAdmitted',
      key: 'nameOfProgrammeAdmitted',
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
  return JSON.stringify({ NAACCriteria522: { ...data } });
};
