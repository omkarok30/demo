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

  type: { type: 'string', db: 'type' },
  degreeName: { type: 'string', db: 'degree_name' },
  degreeCode: { type: 'string', db: 'degree_code' },
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  degreeName: yup.string().required('required').matches(/^[.aA-zZ\s]+$/, 'alphabets, space and dots only.'),
  degreeCode: yup.string().notRequired().matches(/^[0-9aA-zZ]+$/, 'alphabets and numbers only.'),

});

export const columns = (settings: any) => {
  // const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'degreeName', title: 'Department Name' },
    { dataIndex: 'degreeCode', title: 'Department Code' },
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
  return JSON.stringify({ department: { ...data } });
};
