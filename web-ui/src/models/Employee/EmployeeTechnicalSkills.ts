import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { isEmptyValue } from '@/utils/object';
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
  emp_id: { type: 'string', db: 'emp_id' },
  technology: { type: 'string', db: 'technology' },
  level: { type: 'string', db: 'level' },
  details: { type: 'string', db: 'details' },
  uploadDocument: { type: 'string', db: 'upload_document' },
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  emp_id: yup.string().required('required'),
  technology: yup.string().required('required'),
  level: yup.string().required('required'),
  details: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
    if (!isEmptyValue(formValues.details)) {
      return schema;
    }
    return schema.notRequired();
  }),
  uploadDocument: yup.string().notRequired(),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No' },
    { dataIndex: 'technology', title: 'Skill/Technology' },
    { dataIndex: 'level', title: 'Level' },
    { dataIndex: 'details', title: 'Details' },
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
  return JSON.stringify({ employeeTechnicalSkillsDetails: { ...data } });
};
