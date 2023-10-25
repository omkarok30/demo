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

  academicYear: { type: 'string', db: 'academic_year' },
  dateFromTo: { type: 'string', db: 'date_from_to' },
  professionalDevelopmentTitle: { type: 'string', db: 'professional_development_title' },
  administrativeTrainingTitle: { type: 'string', db: 'administrative_training_title' },
  numberOfParticipant: { type: 'int', db: 'number_of_participant' },
  document: { type: 'string', db: 'document' },
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  academicYear: yup.string().required('required'),
  professionalDevelopmentTitle: yup.string().required('required'),
  administrativeTrainingTitle: yup.string().required('required'),
  numberOfParticipant: yup.number().required('Please enter participants')
    .test(
      'Number of Participant',
      'Should be greather than or equal to 0',
      value => value !== undefined && value >= 0,
    ),
  document: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', title: 'Year', width: 100 },
  ];
  return cols;
};

export const columnsProfessional = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr. No', width: 100 },
    { dataIndex: 'dateFromTo', title: 'Dates (from-to) (DD-MM-YYYY)' },
    { dataIndex: 'professionalDevelopmentTitle', title: 'Title of the professional development program organised for teaching staff' },
    { dataIndex: 'administrativeTrainingTitle', title: 'Title of the administrative training program organised for non-teaching staff' },
    { dataIndex: 'numberOfParticipant', title: 'No. of participants' },
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
  return JSON.stringify({ NAACCriteria633: { ...data } });
};
