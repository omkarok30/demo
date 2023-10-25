import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { isEmptyValue } from '@/utils/object';

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
  empId: { type: 'integer', db: 'emp_id' },
  address1: { type: 'string', db: 'address1' },
  address2: { type: 'string', db: 'address2' },
  district: { type: 'string', db: 'district' },
  tehsil: { type: 'string', db: 'tehsil' },
  city: { type: 'string', db: 'city' },
  state: { type: 'string', db: 'state' },
  country: { type: 'string', db: 'country' },
  pincode: { type: 'integer', db: 'pincode' },
  telephoneNumber: { type: 'string', db: 'telephone_number' },
  mobileNumber: { type: 'string', db: 'mobile_number' },
  alternateNumber: { type: 'string', db: 'alternate_number' },
  locationCategory: { type: 'string', db: 'location_category' },
  isSame: { type: 'bool', db: 'isSame' },
  addressType: { type: 'string', db: 'address_type' }
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empId: yup.string(),
  address1: yup.string().required('required'),
  address2: yup.string(),
  district: yup.string().required('required'),
  tehsil: yup.string().required('required'),
  city: yup.string().required('required'),
  state: yup.string().required('required'),
  country: yup.string().required('required'),
  pincode: yup.string().required('required').matches(/^[0-9]+$/, 'Please Enter Numbers Only.').max(6, 'Maximum 6 Numbers').min(6),
  telephoneNumber: yup.string().required('required'),
  mobileNumber: yup.string().required('required').matches(/^[0-9]+$/, 'Please Enter Numbers Only.').max(10, 'Maximum 10 Characters').min(10),
  alternateNumber: yup.string().max(10).when(['$formValues', '$settings'], (formValues, settings, schema) => {
    if (!isEmptyValue(formValues.alternateNumber)) {
      return schema.matches(/^[0-9]+$/, 'Please Enter Numbers Only.');
    }
    return schema.notRequired();
  }),
  locationCategory: yup.string().required('required'),
  isSame: yup.string().required('required'),
  addressType: yup.string().required('required')
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No' },
    {
      dataIndex: 'address1', title: 'Employee Name'
    },
    { dataIndex: 'address2', title: 'Employee Code' },
    { dataIndex: 'state', title: 'Department' },
    { dataIndex: 'mobileNumber', title: 'Date of Joining' },
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
  return JSON.stringify({ employeeAddress: { ...data } });
};
