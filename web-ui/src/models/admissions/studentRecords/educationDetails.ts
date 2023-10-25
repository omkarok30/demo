import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

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

  qualification: { type: 'string', db: 'qualification' },
  specialization: { type: 'string', db: 'specialization' },
  collageName: { type: 'string', db: 'college_name' },
  universityName: { type: 'string', db: 'university_name' },
  percentage: { type: 'string', db: 'percentage' },
  passingYear: { type: 'string', db: 'passing_year' },
  document: { type: 'string', db: 'document' },
};

export const schemaRules = yup.object().shape({
  qualification: yup.string().required('required'),
  collageName: yup.string().required('required'),
  universityName: yup.string().required('required'),
  percentage: yup.string().required('required').matches(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/, 'It accepts two digit before point and two digit after point'),
  passingYear: yup.string().required('required').min(4, 'Please enter correct year').max(4, 'Please enter correct year').matches(/^[0-9]*$/, 'Please enter correct year'),
  document: yup.string(),
  specialization: yup.string().required('required'),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'qualification', title: 'Qualification' },
    { dataIndex: 'specialization', title: 'Specialization' },
    { dataIndex: 'collageName', title: 'School/College Name' },
    { dataIndex: 'universityName', title: 'University/Board Name' },
    { dataIndex: 'percentage', title: 'Percentage/CGPA' },
    { dataIndex: 'passingYear', title: 'Graduating/Passing Year' },
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
  return JSON.stringify(data);
};
