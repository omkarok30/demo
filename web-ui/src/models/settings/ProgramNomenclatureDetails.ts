import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { convertForSubmit } from '@/utils/cast';

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
  programmeId: { type: 'string', db: 'programme_id' },
  name: { type: 'string', db: 'name' },
  fromYear: { type: 'integer', db: 'from_year' },
  toYear: { type: 'integer', db: 'to_year' },
  sameasstudentcode: { type: 'bool', db: 'sameasstudentcode' },
};
export const schemaRules = yup.object().shape({
  name: yup.string().required('required').matches(/^[0-9a-zA-Z]+$/, 'please enter alphanumric values only.'),
  fromYear: yup.string().required('required'),
  toYear: yup.string().required('required'),
  sameasstudentcode: yup.string().required('required'),
});

export const columns = (settings: any) => {
  // const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'name', title: 'Nomenclature for University/Board Enrollment No. of Students ' },
    { dataIndex: 'sameasstudentcode', title: 'Is the value of Enrollment No. the same as that of Student Code?' },
    { dataIndex: 'fromYear', title: 'Batch Starting Year From' },
    { dataIndex: 'toYear', title: 'Batch Starting Year To' },
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
  return JSON.stringify({ nomenclature: { ...data } });
};
