import { ColumnsType } from 'antd/lib/table';
import _, { max } from 'lodash';
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

  empId: { type: 'integer', db: 'emp_id' },
  paymentMode: { type: 'string', db: 'payment_mode' },
  bankName: { type: 'string', db: 'bank_name' },
  accountNumber: { type: 'string', db: 'account_number' },
  accountType: { type: 'string', db: 'account_type' },
  IFSC: { type: 'string', db: 'IFSC' },
};

export const schemaRules = yup.object().shape({
  paymentMode: yup.string().required('required'),
  bankName: yup.string().required('required'),
  accountNumber: yup.number().required('required').max(20, 'maximum 20 characters'),
  accountType: yup.string().required('required'),
  IFSC: yup.string().required('required'),

});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'paymentMode', title: 'Payment Mode' },
    { dataIndex: 'bankName', title: 'Bank Name' },
    { dataIndex: 'accountNumber', title: 'Account Number' },
    { dataIndex: 'accountType', title: 'IFSC Code' },
    { dataIndex: 'IFSC', title: 'Account Type' },
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