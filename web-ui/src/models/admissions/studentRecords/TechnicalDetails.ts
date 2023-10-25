import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

import { convertForSubmit } from '@/utils/cast';
export const tableName = 'studentEvent';

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
  eventLevel: { type: 'string', db: 'event_level' },
  participationType: { type: 'string', db: 'participation_type' },
  eventName: { type: 'string', db: 'event_name' },
  subEventName: { type: 'string', db: 'sub_event_name' },
  organizationName: { type: 'string', db: 'organization_name' },
  dateOfEvent: { type: 'date', db: 'date_of_event' },
  achievement: { type: 'string', db: 'achievement' },
  document: { type: 'string', db: 'document' },
  relevantPo: { type: 'string', db: 'relevant_po' },
  relevantCo: { type: 'string', db: 'relevant_co' },
  country: { type: 'string', db: 'country' },
};

export const schemaRules = yup.object().shape({
  academicYear: yup.string().required('required'),
  eventLevel: yup.string().required('required'),
  participationType: yup.string().required('required'),
  eventName: yup.string().required('required'),
  subEventName: yup.string().required('required'),
  organizationName: yup.string().required('required'),
  dateOfEvent: yup.string().required('required'),
  achievement: yup.string().required('required'),
  document: yup.string(),
  relevantCo: yup.string(),
  country: yup.string(),
  relevantPo: yup.mixed().required('required'),


});

export const columns = (settings: any) => {
  // const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', title: 'Academic Year' },
    { dataIndex: 'eventLevel', title: 'Event Level' },
    { dataIndex: 'participationType', title: 'Participation Type' },
    { dataIndex: 'country', title: 'Country' },
    { dataIndex: 'eventName', title: 'Event' },
    { dataIndex: 'subEventName', title: 'Sub event/Details of Activity' },
    { dataIndex: 'organizationName', title: 'Organization' },
    { dataIndex: 'dateOfEvent', title: 'Date of Event' },
    { dataIndex: 'achievement', title: 'Achievement' },
    { dataIndex: 'relevantCo', title: 'CO' },
    { dataIndex: 'relevantPo', title: 'PO' },

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
  return JSON.stringify({ technicalDetails: { ...data } });
};
