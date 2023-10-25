import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import moment from 'moment';

import { convertForSubmit } from '@/utils/cast';

// id|version|created_at|created_by|updated_at|updated_by|deleted_at|deleted_by|props|type|degree_name|degree_code|start_year|end_year|is_disabled|level_of_education|faculty_of_study|
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
  userId: { type: 'string', db: 'user_id' },
  academicYear: { type: 'integer', db: 'academic_year' },
  courseName: { type: 'string', db: 'course_name' },
  courseDuration: { type: 'string', db: 'course_duration' },
  mode: { type: 'string', db: 'mode' },
  startDate: { type: 'date', db: 'start_date' },
  endDate: { type: 'date', db: 'end_date' },
  organizationName: { type: 'string', db: 'organization_name' },
  relevantPo: { type: 'string', db: 'relevant_po' },
  document: { type: 'string', db: 'document' },

};

export const schemaRules = yup.object().shape({
  academicYear: yup.string().required('required'),
  courseName: yup.string().required('required'),
  courseDuration: yup.string().required('required').matches(/^[0-9]+$/, 'please enter numbers only.'),
  mode: yup.string().required('required'),
  startDate: yup.string().required('required'),
  organizationName: yup.string().required('required'),
  relevantPo: yup.mixed().required('required'),
  document: yup.string(),
  endDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!moment(formValues.endDate).isAfter(formValues.startDate)) {
        return schema.test('failed', 'should be greater than start date', (value, { createError }) => {
          return false;
        });
      }
      return schema.notRequired();
    }),
});

export const columns = (settings: any) => {
  // const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', title: 'Academic Year' },
    { dataIndex: 'courseName', title: 'Course Name' },
    { dataIndex: 'courseDuration', title: 'Course Duration (In Hours)' },
    { dataIndex: 'mode', title: 'Mode' },
    { dataIndex: 'startDate', title: 'Start Date' },
    { dataIndex: 'endDate', title: 'End Date' },
    { dataIndex: 'organizationName', title: 'Name of Training Organization' },
    { dataIndex: 'relevantPo', title: 'Relevant PO' },

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
  return JSON.stringify({ addoncertificates: { ...data } });
};
