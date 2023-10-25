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
  country: { type: 'string', db: 'country' },
  activityName: { type: 'string', db: 'activity_name' },
  otherActivityName: { type: 'string', db: 'other_activity_name' },
  venuePlaceOfActivity: { type: 'string', db: 'venue_place_of_activity' },
  activityDetails: { type: 'string', db: 'activity_details' },
  organizingCollaboratingAgency: { type: 'string', db: 'organizing_collaborating_agency', },
  otherOrganizingCollaboratingAgencyName: { type: 'string', db: 'other_organizing_collaborating_agency_name', },
  dateOfEvent: { type: 'date', db: 'date_of_event' },
  schemeName: { type: 'string', db: 'scheme_name' },
  facultyCoordinator: { type: 'string', db: 'faculty_coordinator' },
  studentParticipants: { type: 'string', db: 'student_participants' },
  achievement: { type: 'string', db: 'achievement' },
  achievementAwardDetails: { type: 'string', db: 'achievement_award_details' },
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
  activityName: yup.string().required('required'),
  otherActivityName: yup.string().required('required'),
  venuePlaceOfActivity: yup.string().required('required'),
  activityDetails: yup.string().required('required'),
  organizingCollaboratingAgency: yup.string().required('required'),
  otherOrganizingCollaboratingAgencyName: yup.string().required('required'),
  dateOfEvent: yup.string().required('required'),
  schemeName: yup.string().required('required'),
  facultyCoordinator: yup.array().required('required'),
  studentParticipants: yup.array().required('required'),
  achievement: yup.string().required('required'),
  achievementAwardDetails: yup.string().required('required'),
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
    { dataIndex: 'activityName', title: 'Activity' },
    { dataIndex: 'otherActivityName', title: 'Other Activity' },
    { dataIndex: 'venuePlaceOfActivity', title: 'Venue/Place of Activity' },
    { dataIndex: 'activityDetails', title: 'Details of Activity', },
    { dataIndex: 'organizingCollaboratingAgency', title: 'Organising Unit/Agency/Collaborating Agency' },
    { dataIndex: 'otherOrganizingCollaboratingAgencyName', title: 'Other Organising Unit/Agency/Collaborating Agency', },
    { dataIndex: 'dateOfEvent', title: 'Date' },
    { dataIndex: 'schemeName', title: 'Name of the scheme' },
    { dataIndex: 'facultyCoordinator', title: 'Faculty Coordinator/ Participation', },
    { dataIndex: 'studentParticipants', title: 'Number of Students Participants' },
    { dataIndex: 'achievement', title: 'Achievement/Award' },
    { dataIndex: 'achievementAwardDetails', title: 'Details' },
    { dataIndex: 'relevantPo', title: 'Relevant Po' },
    { dataIndex: 'relevantCo', title: 'Relevant Co' },
    { dataIndex: 'linkToActivityDocs', title: 'Links to the Image/s of Activity' },
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
  return JSON.stringify({ extensionActivity: { ...data } });
};
