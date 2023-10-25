import _ from 'lodash';
import * as yup from 'yup';
import { ColumnsType } from 'antd/lib/table';
import { convertForSubmit } from '@/utils/cast';

export const tableName = 'lookups';

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

  group: { type: 'string', db: 'group' },
  type: { type: 'string', db: 'type' },
  value: { type: 'json', db: 'value' },
  name: { type: 'string', db: 'name' },
  refId: { type: 'string', db: 'ref_id' },
  refType: { type: 'string', db: 'ref_type' },
  readonly: { type: 'boolean', db: 'readonly' },
};

export const schemaRules = yup.object().shape({
  group: yup.string().notRequired(),
  type: yup.string().notRequired(),
  value: yup.string().notRequired(),
  name: yup.string().notRequired(),
  refId: yup.string().notRequired(),
  refType: yup.string().notRequired(),
  readonly: yup.string().notRequired(),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'type', title: 'Type' },
    { dataIndex: 'value', title: 'Value' },
    { dataIndex: 'name', title: 'Name' },
  ];
  return cols;
};

export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (!modelOnly) {
      _.set(data, [key], value);
      return;
    }
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns, modelOnly);
  return JSON.stringify({ lookups: { ...data } });
};
