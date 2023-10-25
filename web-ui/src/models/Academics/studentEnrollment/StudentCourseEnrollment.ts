import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import * as studentInfo from '../../admissions/studentRecords/StudentInfo';
import * as divisionRepository from '../../fyacademics/courseManagement/Divisions';
import { isEmptyValue } from '@/utils/object';

export const tableName = 'student_division';

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
  studId: { type: 'string', db: 'stud_id' },
  courseId: { type: 'string', db: 'course_id' },
  departmentId: { type: 'string', db: 'department_id' },

  academicYear: { type: 'string', db: 'academic_year' },
  term: { type: 'string', db: 'term' },
  division: { type: 'string', db: 'division' },
  programId: { type: 'string', db: 'program_id' },
  className: { type: 'string', db: 'class_name' },
  degreeLevel: { type: 'string', db: 'degree_level' },
  status: { type: 'string', db: 'status' },
  linkToDocument: { type: 'string', db: 'link_to_document' },
  document: { type: 'string', db: 'document' },

  // foreign key data at the end
  [`${studentInfo.tableName}$scholarNumber`]:
    studentInfo.allColumns.scholarNumber,
  [`${studentInfo.tableName}$enrolmentNumber`]:
    studentInfo.allColumns.enrolmentNumber,
  [`${studentInfo.tableName}$firstName`]: studentInfo.allColumns.firstName,
  [`${studentInfo.tableName}$lastName`]: studentInfo.allColumns.lastName,
  [`${studentInfo.tableName}$middleName`]: studentInfo.allColumns.middleName,
  [`${divisionRepository.tableName}$division`]:
    divisionRepository.allColumns.division,
};

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'studentInfo$scholarNumber', title: 'Student Code' },
    { dataIndex: 'studentInfo$enrolmentNumber', title: 'PRN NO' },

    {
      dataIndex: 'divisionRepository$division',
      title: 'Previous Division',
    },
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
  return JSON.stringify(data);
};
