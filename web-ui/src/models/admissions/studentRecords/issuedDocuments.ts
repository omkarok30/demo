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

  dateofIssue: { type: 'date', db: 'date_of_issue' },
  typeofDocument: { type: 'string', db: 'type_of_document' },
  purpose: { type: 'string', db: 'purpose' },
  viewDocument: { type: 'string', db: 'view_document' },
};

export const schemaRules = yup.object().shape({
  dateofIssue: yup.string().required('required'),
  typeofDocument: yup.string(),
  purpose: yup.string(),
  viewDocument: yup.string(),
});

export const columns = (settings: any) => {
  // const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'dateofIssue', title: 'Date of Issue' },
    { dataIndex: 'typeofDocument', title: 'Type of Document' },
    { dataIndex: 'purpose', title: 'Purpose' },
   
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
  return JSON.stringify({ document: { ...data } });
};
