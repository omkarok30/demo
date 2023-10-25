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
  country: { type: 'string', db: 'country' },
  sportName: { type: 'string', db: 'sport_name' },
  sportType: { type: 'string', db: 'sport_type' },
  considerForAccredation: { type: 'string', db: 'consider_for_accredation' },
  member: { type: 'string', db: 'member' },
  organizationName: { type: 'string', db: 'organization_name' },
  detailsOfParticipation: { type: 'string', db: 'details_of_participation' },
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
  country: yup.string().required('required'),
  sportName: yup.string().required('required'),
  sportType: yup.string().required('required'),
  considerForAccredation: yup.string().required('required'),
  member: yup.string().required('required'),
  organizationName: yup.string().required('required'),
  detailsOfParticipation: yup.string().required('required'),
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
    { dataIndex: 'country', title: 'Country' },
    { dataIndex: 'sportName', title: 'Sport' },

    { dataIndex: 'organizationName', title: 'Organization' },
    { dataIndex: 'dateOfEvent', title: 'Date' },

    {
      dataIndex: 'detailsOfParticipation',
      title: 'Details of Participation',
    },
    { dataIndex: 'achievement', title: 'Achievement' },
    { dataIndex: 'sportType', title: 'Sport type' },
    {
      dataIndex: 'considerForAccredation',
      title: 'Consider For Accredation',
    },
    {
      dataIndex: 'linkToActivityDocs',
      title: 'Links to the Image/s of Activity',
    },
    { dataIndex: 'relevantPo', title: 'Po' },
    { dataIndex: 'relevantCo', title: 'Co' },
    { dataIndex: 'document', title: 'Document' },
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
  return JSON.stringify({ sport: { ...data } });
};
