import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

import { convertForSubmit } from '@/utils/cast';

export const tableName = 'book_transaction';

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

  userID: { type: 'string', db: 'user_id' },
  userType: { type: 'integer', db: 'user_type' },
  accessionNo: { type: 'string', db: 'accession_no' },
  dateOfIssue: { type: 'date', db: 'date_of_issue' },
  expectedDateOfSubmission: { type: 'date', db: 'expected_date_of_submission' },
  submittedDate: { type: 'date', db: 'submitted_date' },
  status: { type: 'string', db: 'status' },
};

export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ dayFormat: { ...data } });
};
