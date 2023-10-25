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

  academicYear: { type: 'string', db: 'academic_year' },
  className: { type: 'string', db: 'class' },
  sem1Percentage: { type: 'string', db: 'sem1_marks' },
  sem1Sgpa: { type: 'string', db: 'sem1_marks_sgpa' },
  sem1Status: { type: 'string', db: 'sem1_status' },
  sem2Percentage: { type: 'string', db: 'sem2_marks' },
  sem2Sgpa: { type: 'string', db: 'sem2_marks_sgpa' },
  sem2Status: { type: 'string', db: 'sem2_status' },
  overallResult: { type: 'string', db: 'overall_status' },
  overallPercentage: { type: 'string', db: 'overall_marks' },
  overallCgpa: { type: 'string', db: 'overall_marks_cgpa' },
  freezed: { type: 'string', db: 'freeze' },
};

export const schemaRules = yup.object().shape({
  academicYear: yup.string(),
  className: yup.string(),
  sem1Percentage: yup.string().matches(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/, 'Please enter valid percentage'),
  sem1Sgpa: yup.string().matches(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/, 'Please enter valid SGPA'),
  sem1Status: yup.string().required('required'),
  sem2Percentage: yup.string().matches(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/, 'Please enter valid percentage'),
  sem2Sgpa: yup.string().matches(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/, 'Please enter valid SGPA'),
  sem2Status: yup.string().required('required'),
  overallResult: yup.string().required('required'),
  overallPercentage: yup.string().matches(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/, 'Please enter valid percentage'),
  overallCgpa: yup.string().matches(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/, 'Please enter valid SGPA'),
  freezed: yup.string(),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', title: 'Academic Year' },
    { dataIndex: 'className', title: 'Class' },
    { dataIndex: 'sem1Percentage', title: 'Sem1 %' },
    { dataIndex: 'sem1Sgpa', title: 'Sem1 SGPA' },
    { dataIndex: 'sem1Status', title: 'Sem1 Status' },
    { dataIndex: 'sem2Percentage', title: 'Sem2 %' },
    { dataIndex: 'sem2Sgpa', title: 'Sem2 SGPA' },
    { dataIndex: 'sem2Status', title: 'Sem2 Status' },
    { dataIndex: 'overallPercentage', title: 'Overall %' },
    { dataIndex: 'overallCgpa', title: 'Overall CGPA' },
    { dataIndex: 'overallResult', title: 'Overall Status' },
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
