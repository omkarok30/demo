import { ColumnsType } from 'antd/lib/table';
import _, { max } from 'lodash';
import * as yup from 'yup';

import { convertForSubmit } from '@/utils/cast';
import { isEmptyValue } from '@/utils/object';

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

  bloodGroup: { type: 'integer', db: 'blood_group' },
  noofDependents: { type: 'integer', db: 'no_of_dependents ' },
  emergencyContactNumber: { type: 'string', db: 'emergency_contact_number' },
  emergencyContactName: { type: 'string', db: 'emergency_contact_name' },
  nominee: { type: 'string', db: 'nominee' },
  nomineeMobile: { type: 'string', db: 'nominee_mobile' },
  nomineeEmail: { type: 'string', db: 'nominee_email' },
};

export const schemaRules = yup.object().shape({
  bloodGroup: yup.string().required('required'),
  noofDependents: yup.string().required('required').matches(/^[0-9\s]+$/, 'Please Enter Numbers Only.'),
  emergencyContactNumber: yup.string().required('required').matches(/^[0-9]+$/, 'Please Enter Numbers Only.').max(10, 'Maximum 10 Characters').min(10),
  emergencyContactName: yup.string().required('required').matches(/^[a-zA-Z]+$/, 'Please Enter Alphabets  Only.'),
  nominee: yup.string().required('required').matches(/^[a-zA-Z]+$/, 'Please Enter Alphabets  Only.'),
  nomineeMobile: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
    if (!isEmptyValue(formValues.nomineeMobile)) {
      return schema.matches(/^[0-9]+$/, 'Please Enter Numbers Only.').max(10, 'Maximum 10 Characters').min(10);
    }
    return schema.notRequired();
  }),
  nomineeEmail: yup.string().matches(
    /\S+@\S+\.\S+/,
    'Please enter valid email address',
  ),

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
  return JSON.stringify({ department: { ...data } });
};