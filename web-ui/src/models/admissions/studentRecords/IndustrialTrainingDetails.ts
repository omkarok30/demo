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
  studId: { type: 'string', db: 'student_id' },
  academicYear: { type: 'integer', db: 'academic_year' },
  startDate: { type: 'date', db: 'startdate' },
  endDate: { type: 'date', db: 'enddate' },
  organisationDetails: { type: 'string', db: 'organisation_details' },
  duration: { type: 'integer', db: 'duration' },
  location: { type: 'string', db: 'location' },
  document: { type: 'string', db: 'document' },
  relevantPo: { type: 'string', db: 'relevant_po' },
  relevantCo: { type: 'string', db: 'relevant_co' },

};

export const schemaRules = yup.object().shape({
  academicYear: yup.string().required('required'),
  organisationDetails: yup.string().required('required'),
  duration: yup.string().required('required'),
  location: yup.string().required('required'),
  document: yup.string().required('required'),
  startDate: yup.string().required('required'),
  relevantPo: yup.mixed().required('required'),
  relevantCo: yup.string(),
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
    { dataIndex: 'organisationDetails', title: 'Orgnization/Industry Details' },
    { dataIndex: 'startDate', title: 'Start Date' },
    { dataIndex: 'endDate', title: 'End Date' },
    { dataIndex: 'duration', title: 'Duration' },
    { dataIndex: 'location', title: 'location' },
    { dataIndex: 'relevantPo', title: 'PO' },
    { dataIndex: 'relevantCo', title: 'CO' },
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
  return JSON.stringify({ workshopdetails: { ...data } });
};
