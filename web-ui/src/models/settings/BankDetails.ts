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

  accountType: { type: 'string', db: 'account_type' },
  bankName: { type: 'string', db: 'bank_name' },
  branchName: { type: 'string', db: 'branch_name' },
  branchAddress: { type: 'string', db: 'branch_address' },
  ifscCode: { type: 'string', db: 'ifsc_code' },
  accountNumber: { type: 'string', db: 'account_number' },
  linkToSalary: { type: 'boolean', db: 'link_to_salary' },
};

export const schemaRules = yup.object().shape({
  bankName: yup.string().required('required'),
  branchName: yup.string().required('required'),
  ifscCode: yup.string().required('required'),
  accountType: yup.string(),
  accountNumber: yup.string().required('required').matches(/^[0-9aA-zZ]+$/, 'Please enter alphabets and numbers only.'),
  branchAddress: yup.string().notRequired(),
  linkToSalary: yup.string().notRequired(),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'bankName', title: 'Bank Name' },
    { dataIndex: 'branchName', title: 'Branch' },
    { dataIndex: 'ifscCode', title: 'IFSC Code' },
    { dataIndex: 'accountNumber', title: 'Account Number' },
    { dataIndex: 'branchAddress', title: 'Address' },
    { dataIndex: 'linkToSalary', title: 'Association with Employee Salary' },
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
  return JSON.stringify({ bankDetails: { ...data } });
};
