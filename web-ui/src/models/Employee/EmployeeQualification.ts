import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

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
  collegeName: { type: 'string', db: 'college_name' },
  levelOfEducation: { type: 'string', db: 'level_of_education' },
  universityName: { type: 'string', db: 'university_name' },
  percentage: { type: 'string', db: 'percentage' },
  passingYear: { type: 'string', db: 'passing_year' },
  degree: { type: 'string', db: 'degree' },
  specialization: { type: 'string', db: 'specialization' },
  certificateDocument: { type: 'string', db: 'certificate_document' },
  registrationYear: { type: 'string', db: 'registration_year' },
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  userId: yup.string().required('required'),
  collegeName: yup.string().required('required'),
  levelOfEducation: yup.string().required('required'),
  universityName: yup.string().required('required'),
  percentage: yup.string().required('required'),
  passingYear: yup.string().required('required'),
  degree: yup.string().required('required'),
  specialization: yup.string().required('required'),
  certificateDocument: yup.string().required('required'),
  registrationYear: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No' },
    { dataIndex: 'levelOfEducation', title: 'Qualification' },
    { dataIndex: 'collegeName', title: 'School/College Name' },
    {
      dataIndex: 'universityName',
      title: 'University/Board',
      render(value, record, index) {
        return record.universityName === '' ? '-' : record.universityName;
      },
    },
    {
      dataIndex: 'degree',
      title: 'Degree',
      render(value, record, index) {
        return record.degree === '' ? '-' : record.degree;
      },
    },
    {
      dataIndex: 'specialization',
      title: 'Specialization',
      render(value, record, index) {
        return record.specialization === '' ? '-' : record.specialization;
      },
    },
    { dataIndex: 'percentage', title: 'Percentage/CGPA' },
    { dataIndex: 'passingYear', title: 'Graduating Year' },
    {
      dataIndex: 'registrationYear',
      title: 'Year of Registration',
      render(value, record, index) {
        return record.registrationYear === '' ? '-' : record.registrationYear;
      },
    },
    {
      dataIndex: 'certificateDocument',
      title: 'Certificate',
      render(value, record, index) {
        return record.certificateDocument === '' ? '-' : record.certificateDocument;
      },
    },
  ];
  return cols;
};

export const submitJSON = (values: any, modelOnly = true) => {
  const data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  return JSON.stringify({ employeeQualificationDetails: { ...data } });
};
