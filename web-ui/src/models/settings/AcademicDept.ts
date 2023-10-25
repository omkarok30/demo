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

  type: { type: 'string', db: 'type' },
  degreeName: { type: 'string', db: 'degree_name' },
  degreeCode: { type: 'string', db: 'degree_code' },
  startYear: { type: 'integer', db: 'start_year' },
  endYear: { type: 'integer', db: 'end_year' },
  isDisabled: { type: 'bool', db: 'is_disabled' },
  levelOfEducation: { type: 'string', db: 'level_of_education' },
  facultyOfStudy: { type: 'string', db: 'faculty_of_study' },
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  degreeName: yup.string().required('required'),
  degreeCode: yup.string().required('required').max(2, 'maximum 2 characters'),
  facultyOfStudy: yup.string().required('required'),
  levelOfEducation: yup.string().required('required'),
  startYear: yup.string().required('required'),
  endYear: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'degreeName', title: 'Department Name' },
    { dataIndex: 'degreeCode', title: 'Department Code' },
    { dataIndex: 'levelOfEducation', title: 'Level of Education' },
    { dataIndex: 'facultyOfStudy', title: 'Faculty of Study' },
    { dataIndex: 'startYear', title: 'Commencement Year' },
    { dataIndex: 'endYear', title: 'Closure Year' },
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
  return JSON.stringify({ department: { ...data } });
};
