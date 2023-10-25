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
  studentId: { type: 'string', db: 'student_id' },
  academicYear: { type: 'integer', db: 'academic_year' },
  eventLevel: { type: 'string', db: 'sport_level' },
  participationType: { type: 'string', db: 'participation_type' },
  eventName: { type: 'string', db: 'event_name' },
  organizationName: { type: 'string', db: 'organization_name' },
  dateOfEvent: { type: 'date', db: 'date_of_event' },
  achievement: { type: 'string', db: 'achievement' },
  relevantPo: { type: 'string', db: 'relevant_po' },
  relevantCo: { type: 'string', db: 'relevant_co' },
  linkToActivityDocs: { type: 'string', db: 'link_to_activity_docs' },
  document: { type: 'string', db: 'document' },
};

export const schemaRules = yup.object().shape({
  academicYear: yup.string().required('required'),
  eventLevel: yup.string().required('required'),
  participationType: yup.string().required('required'),
  eventName: yup.string().required('required'),
  organizationName: yup.string().required('required'),
  dateOfEvent: yup.string().required('required'),
  achievement: yup.string().required('required'),
  relevantPo: yup.string().required('required'),
  relevantCo: yup.string(),
  linkToActivityDocs: yup.string(),
  document: yup.string(),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', title: 'Academic Year' },
    { dataIndex: 'eventLevel', title: 'Event Level' },
    { dataIndex: 'participationType', title: 'Participation Type' },
    { dataIndex: 'eventName', title: 'Event' },
    { dataIndex: 'organizationName', title: 'Organization' },
    { dataIndex: 'dateOfEvent', title: 'Date of Event' },
    { dataIndex: 'achievement', title: 'Achievement' },
    { dataIndex: 'linkToActivityDocs', title: 'Links to the Image/s of Activity' },
    { dataIndex: 'relevantPo', title: 'PO' },
    { dataIndex: 'relevantCo', title: 'CO' },
    { dataIndex: 'document', title: 'Documents' },
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
  return JSON.stringify({ cultural: { ...data } });
};
