import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { convertForSubmit } from '@/utils/cast';
import * as studentInfo from '@/models/admissions/studentRecords/StudentInfo';
import * as studentEvent from '@/models/admissions/studentRecords/TechnicalDetails';

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
  year: { type: 'string', db: 'year' },
  events$count: { type: 'string', db: 'events' },
  [`${studentEvent.tableName}$eventName`]: studentEvent.allColumns.eventName,
  [`${studentEvent.tableName}$dateOfEvent`]: studentEvent.allColumns.dateOfEvent,
  [`${studentInfo.tableName}$firstName`]: studentInfo.allColumns.firstName,
  [`${studentInfo.tableName}$lastName`]: studentInfo.allColumns.lastName,
  [`${studentInfo.tableName}$middleName`]: studentInfo.allColumns.middleName,
  [`${studentInfo.tableName}$programId`]: studentInfo.allColumns.programId,
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  year: yup.string().required('required'),
  events$count: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', key: 'academicYear', title: 'Year', width: 100 },
    { dataIndex: 'events$count', key: 'events$count', title: 'Number of sports and cultural events/competitions in which students of the Institution participated during the year', width: 300 },
  ];
  return cols;
};

export const columnsEvents = (settings: any) => {
  const naac_version = settings.get('naac_version') || [];
  const cols: ColumnsType<any> = [
    { title: 'Sr. No.', dataIndex: 'id' },
    { title: 'Date of event/activity (DD-MM-YYYY)', dataIndex: 'dateOfEvent', key: 'dateOfEvent' },
    { title: 'Name of the event/activity', dataIndex: 'eventName', key: 'eventName' },
    {
      dataIndex: 'studentName',
      key: 'studentName',
      title: 'Name of the student participated',
      render: (_, record) => {
        return `${record.studentInfo$firstName} ${record.studentInfo$middleName} ${record.studentInfo$firstName}`;
      },
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
  return JSON.stringify({ NAACCriteria531: { ...data } });
};
