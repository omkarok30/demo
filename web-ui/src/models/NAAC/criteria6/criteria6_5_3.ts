import _ from 'lodash';
import * as yup from 'yup';
import { ColumnsType } from 'antd/lib/table';
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

  academicYear: { type: 'string', db: 'academic_year' },
  criteriaNumber: { type: 'string', db: 'criteria_number' },
  participationInNirf: { type: 'string', db: 'participation_in_nirf' },
  collaborativeQuality: { type: 'string', db: 'collaborative_quality' },
  otherQualityAudit: { type: 'string', db: 'other_quality_audit' },
  dateFrmoTo: { type: 'string', db: 'date_from_to' },
  conferenceSeminar: { type: 'string', db: 'conference_seminar' },
  regularMeetings: { type: 'string', db: 'regular_meetings' },
};

export const columns = (settings: any) => {
  const naac_version = settings.get('naac_version') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', key: 'id', title: 'Sr. No' },
    { dataIndex: 'regularMeetings', key: 'regularMeetings', title: 'Regular meetings of the IQAC held' },
    { dataIndex: 'conferenceSeminar', key: 'conferenceSeminar', title: 'Conferences, Seminars, Workshops on quality conducted' },
    { dataIndex: 'collaborativeQuality', key: 'collaborativeQuality', title: 'Collaborative quality initiatives with other institution(s) (Provide name of the institution and activity' },
    { dataIndex: 'participationInNirf', key: 'participationInNirf', title: 'Participation in NIRF along with Status' },
    { dataIndex: 'dateFrmoTo', key: 'dateFrmoTo', title: 'Orientation programme on quality issues for teachers and students, Date (From-To) (DD-MM-YYYY)' },
    { dataIndex: 'otherQualityAudit', key: 'otherQualityAudit', title: 'Any other quality audit as recognized by the State, National or International agencies (ISO certification, NBA and such others' },
  ];
  return cols;
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  academicYear: yup.number().required('required'),
  participationInNirf: yup.string().required('Please enter NIRF value'),
  collaborativeQuality: yup.string().required('Please enter collaborative quality'),
  otherQualityAudit: yup.string().required('Please enter audit'),
  regularMeetings: yup.string().required('Please enter Meeting of IQAC'),
  conferenceSeminar: yup.string().required('required'),
});

export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ NAACCriteria653: { ...data } });
};
