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

  academicYear: { type: 'integer', db: 'academic_year' },
  fileDescription: { type: 'string', db: 'file_description' },
  linkdocument: { type: 'string', db: 'document_link' },
  uploadPath: { type: 'string', db: 'upload_path' },
  level: { type: 'string', db: 'level' },
  hardcode: { type: 'boolean', db: 'hardcode' },
  rowNumber: { type: 'integer', db: 'rownumber' },
  criteriaNumber: { type: 'string', db: 'criteria_number' },
};

export const schemaRules = yup.object().shape({
  name: yup.string(),
  fileDescription: yup.string(),
  linkdocument: yup.string(),
  uploadPath: yup.string(),
  level: yup.string(),
  hardcode: yup.boolean(),
  rowNumber: yup.number(),
  criteriaNumber: yup.string(),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr. No.' },
    { dataIndex: 'filedescription', title: 'File Name and Description' },
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
  return JSON.stringify({ FileDescription: { ...data } });
};
