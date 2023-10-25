import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

import { convertForSubmit } from '@/utils/cast';
export const tableName = 'courses';
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

  code: { type: 'string', db: 'code' },
  type: { type: 'string', db: 'type' },
  name: { type: 'string', db: 'name' },
  shortName: { type: 'string', db: 'short_name' },
  programId: { type: 'array', db: 'program_id' },
  levelOfEducation: { type: 'string', db: 'level_of_education' },
  curriculumComp: { type: 'string', db: 'curriculum_comp' },
  scheme: { type: 'string', db: 'scheme' },
  introductionYear: { type: 'string', db: 'introduction_year' },
  isElective: { type: 'string', db: 'is_elective' },
  isactive: { type: 'number', db: 'is_active' },
  documentLink: { type: 'string', db: 'document_link' },
  departmentId: { type: 'string', db: 'department_id' },
  batch_applicable: { type: 'string', db: 'batch_applicable' },
  courseHours: { type: 'string', db: 'batch_applicable' },
  courseCredits: { type: 'string', db: 'batch_applicable' },
  courseMethdCredits: { type: 'array', db: 'batch_applicable' },

};

export const schemaRules = yup.object().shape({
  levelOfEducation: yup.string().required('required'),
  name: yup.string().required('required'),
  code: yup.string().required('required').matches(/^\S*$/, 'PLEASE ENTER COURSE CODE WITHOUT SPACE'),
  shortName: yup.string().required('required'),
  type: yup.string().required('required'),
  isElective: yup.string().required('required'),
  curriculumComp: yup.string().required('required'),
  programId: yup.array().required('required'),
  introductionYear: yup.string().matches(/^[0-9]+$/, 'Please Enter Numbers Only.').max(4, 'Maximum 4 Numbers').min(4).nullable(),
  documentLink: yup.string().required('required'),
  courseHours: yup.string().required('required').matches(/^[0-9]+$/, 'Please Enter Numbers Only.').nullable(),
  courseCredits: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'code', title: 'Course Code' },
    { dataIndex: 'type', title: 'Type of Course' },
    { dataIndex: 'name', title: 'Course' },
    { dataIndex: 'shortName', title: 'Course Short Name' },
    { dataIndex: 'curriculumComp', title: 'Curriculum Component' },
    {
      dataIndex: 'courseMethdCredits',
      title: 'Course Method and Credits',
      render: courseMethdCredits => courseMethdCredits.map(courseMethdCredit => `${courseMethdCredit.method} - ${courseMethdCredit.credits}`).join(', '),
      key: 'courseMethdCredits',
    },
    { dataIndex: 'courseCredits', title: 'Course Credits' },
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
  return JSON.stringify({ ManageCourses: { ...data } });
};
