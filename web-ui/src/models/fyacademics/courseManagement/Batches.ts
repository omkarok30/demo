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

  programId: { type: 'string', db: 'program_id' },
  academicYear: { type: 'integer', db: 'academic_year' },
  className: { type: 'string', db: 'class_name' },
  division: { type: 'string', db: 'division' },
  semester: { type: 'string', db: 'semester' },
  numberOfBatches: { type: 'integer', db: 'number_of_batches' },
  isFy: { type: 'string', db: 'is_fy' },
};

export const schemaRules = yup.object().shape({
  numberOfBatches: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
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
  return JSON.stringify({ batches: { ...data } });
};
