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
  eventLevel: { type: 'string', db: 'event_level' },
  participationType: { type: 'string', db: 'participation_type' },
  activityName: { type: 'string', db: 'activity_name' },
  venuePlaceOfActivity: { type: 'string', db: 'venue_place_of_activity' },
  activityDetails: { type: 'string', db: 'activity_details' },
  organizingCollaboratingAgency: { type: 'string', db: 'organizing_collaborating_agency' },
  otherOrganizingCollaboratingAgencyName: { type: 'string', db: 'other_organizing_collaborating_agency_name' },
  dateOfEvent: { type: 'date', db: 'date_of_event' },
  achievement: { type: 'string', db: 'achievement' },
  relevantPo: { type: 'string', db: 'relevant_po' },
  relevantCo: { type: 'string', db: 'relevant_co' },
  linkToActivityDocs: { type: 'string', db: 'link_to_activity_docs' },
  activityImageUpload: { type: 'string', db: 'activity_image_upload' },
  document: { type: 'string', db: 'document' },
};

export const schemaRules = yup.object().shape({
  academicYear: yup.string().required('required'),
  eventLevel: yup.string().required('required'),
  participationType: yup.string().required('required'),
  activityName: yup.string().required('required'),
  venuePlaceOfActivity: yup.string().required('required'),
  activityDetails: yup.string().required('required'),
  organizingCollaboratingAgency: yup.string().required('required'),
  otherOrganizingCollaboratingAgencyName: yup.string().required('required'),
  dateOfEvent: yup.string().required('required'),
  achievement: yup.string().required('required'),
  relevantPo: yup.string().required('required'),
  relevantCo: yup.string(),
  linkToActivityDocs: yup.string(),
  activityImageUpload: yup.string(),
  document: yup.string(),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', title: 'Academic Year' },
    { dataIndex: 'eventLevel', title: 'Event Level' },
    { dataIndex: 'participationType', title: 'Participation Type' },
    { dataIndex: 'activityName', title: 'Activity' },
    { dataIndex: 'venuePlaceOfActivity', title: 'Venue/Place of Activity' },
    { dataIndex: 'activityDetails', title: 'Details of Activity ', },
    { dataIndex: 'organizingCollaboratingAgency', title: 'Name of Organising unit/ agency/ collaborating agency' },
    { dataIndex: 'dateOfEvent', title: 'Date' },
    { dataIndex: 'achievement', title: 'Achievement' },
    { dataIndex: 'linkToActivityDocs', title: 'Links to the Image/s of Activity' },
    { dataIndex: 'activityImageUpload', title: 'Activities Photos' },
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
  return JSON.stringify({ extendedSocialActivity: { ...data } });
};
