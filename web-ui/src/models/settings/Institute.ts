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
  name: { type: 'string', db: 'name' },
  displayName: { type: 'string', db: 'display_name' },
  address1: { type: 'string', db: 'address1' },
  address2: { type: 'string', db: 'address2' },
  address3: { type: 'string', db: 'address3' },
  startYear: { type: 'string', db: 'start_year' },
  country: { type: 'string', db: 'country' },
  state: { type: 'string', db: 'state' },
  district: { type: 'string', db: 'district' },
  tehsil: { type: 'string', db: 'tehsil' },
  pincode: { type: 'string', db: 'pincode' },
  contact: { type: 'string', db: 'contact' },
};

export const schemaRules = yup.object().shape({
  name: yup.string().required('required'),
  displayName: yup.string().required('required'),
  address1: yup.string(),
  address2: yup.string(),
  address3: yup.string(),
  startYear: yup.string().required('required'),
  country: yup.string().required('required'),
  state: yup.string().required('required'),
  district: yup.string().required('required'),
  tehsil: yup.string(),
  pincode: yup.string().required('required'),
  contact: yup.string().required('required'),
});

export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ institute: { ...data } });
};
