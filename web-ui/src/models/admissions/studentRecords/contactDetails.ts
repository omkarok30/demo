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

  phoneNumber: { type: 'string', db: 'phone_number' },
  numberType: { type: 'string', db: 'number_type' },
  belongsTo: { type: 'string', db: 'belongs_to' },
  responsibleName: { type: 'string', db: 'responsible_name' },
};

export const schemaRules = yup.object().shape({
  phoneNumber: yup.string().required('required').min(10, 'Please enter valid number').max(10, 'Please enter valid number'),
  numberType: yup.string().required('required'),
  belongsTo: yup.string().required('required'),
  responsibleName: yup.string().required('required'),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'phoneNumber', title: 'Contact Number' },
    { dataIndex: 'numberType', title: 'Number Type' },
    { dataIndex: 'belongsTo', title: 'Belongs To' },
    { dataIndex: 'responsibleName', title: 'Person Name' },
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
  return JSON.stringify({ contactDetails: { ...data } });
};
