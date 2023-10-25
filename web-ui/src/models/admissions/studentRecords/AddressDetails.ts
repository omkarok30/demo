import _ from 'lodash';
import * as yup from 'yup';
import { ColumnsType } from 'antd/lib/table';
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
  address1: { type: 'string', db: 'address1' },
  address2: { type: 'string', db: 'address2' },
  address3: { type: 'string', db: 'address3' },
  locationType: { type: 'string', db: 'locality_type' },
  city: { type: 'string', db: 'city' },
  district: { type: 'string', db: 'district' },
  state: { type: 'string', db: 'state' },
  country: { type: 'string', db: 'country' },
  pincode: { type: 'string', db: 'pincode' },
  presentAddress1: { type: 'string', db: 'present_address1' },
  presentAddress2: { type: 'string', db: 'present_address2' },
  presentAddress3: { type: 'string', db: 'present_address3' },
  presentLocationType: { type: 'string', db: 'present_locality_type' },
  presentCity: { type: 'string', db: 'present_city' },
  presentDistrict: { type: 'string', db: 'present_district' },
  presentState: { type: 'string', db: 'present_state' },
  presentCountry: { type: 'string', db: 'present_country' },
  presentPincode: { type: 'string', db: 'present_pincode' },
  guardianName: { type: 'string', db: 'guardian_name' },
  guardianContactNo: { type: 'string', db: 'guardian_contact_no' },
  guardianAddress1: { type: 'string', db: 'guardian_address1' },
  guardianAddress2: { type: 'string', db: 'guardian_address2' },
  guardianAddress3: { type: 'string', db: 'guardian_address3' },
  guardianLocationType: { type: 'string', db: 'guardian_locality_type' },
  guardianCity: { type: 'string', db: 'guardian_city' },
  guardianDistrict: { type: 'string', db: 'guardian_district' },
  guardianState: { type: 'string', db: 'guardian_state' },
  guardianCountry: { type: 'string', db: 'guardian_country' },
  guardianPincode: { type: 'string', db: 'guardian_pincode' },
};

export const schemaRules = yup.object().shape({
  address1: yup.string().required('required'),
  address2: yup.string(),
  address3: yup.string(),
  locationType: yup.string(),
  city: yup.string(),
  district: yup.string().required('required'),
  state: yup.string().required('required'),
  country: yup.string().required('required'),
  pincode: yup.string().required('required').matches(/^[0-9\s]+$/, 'Please Enter Numbers Only.').min(6),
  presentAddress1: yup.string().required('required'),
  presentAddress2: yup.string(),
  presentAddress3: yup.string(),
  presentLocationType: yup.string(),
  presentCity: yup.string(),
  presentDistrict: yup.string().required('required'),
  presentState: yup.string().required('required'),
  presentCountry: yup.string().required('required'),
  presentPincode: yup.string().required('required').matches(/^[0-9\s]+$/, 'Please Enter Numbers Only.').min(6),
  guardianName: yup.string(),
  guardianContactNo: yup.string().matches(/^[0-9]+$/, 'Please Enter Numbers Only.').max(10, 'Maximum 10 Characters').min(10),
  guardianAddress1: yup.string(),
  guardianAddress2: yup.string(),
  guardianAddress3: yup.string(),
  guardianLocationType: yup.string(),
  guardianCity: yup.string(),
  guardianDistrict: yup.string(),
  guardianState: yup.string(),
  guardianCountry: yup.string(),
  guardianPincode: yup.string().matches(/^[0-9\s]+$/, 'Please Enter Numbers Only.').min(6),
});

export const permanentAddressColumns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'address1', title: 'Address Line1' },
    { dataIndex: 'address2', title: 'Address Line2' },
    { dataIndex: 'address3', title: 'Address Line3' },
    { dataIndex: 'locationType', title: 'Location Category' },
    { dataIndex: 'city', title: 'City' },
    { dataIndex: 'district', title: 'District' },
    { dataIndex: 'state', title: 'State' },
    { dataIndex: 'country', title: 'Country' },
    { dataIndex: 'pincode', title: 'Pincode' },
  ];
  return cols;
};

export const presentColumns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'presentAddress1', title: 'Address Line1' },
    { dataIndex: 'presentAddress2', title: 'Address Line2' },
    { dataIndex: 'presentAddress3', title: 'Address Line3' },
    { dataIndex: 'presentLocationType', title: 'Location Category' },
    { dataIndex: 'presentCity', title: 'City' },
    { dataIndex: 'presentDistrict', title: 'District' },
    { dataIndex: 'presentState', title: 'State' },
    { dataIndex: 'presentCountry', title: 'Country' },
    { dataIndex: 'presentPincode', title: 'Pincode' },
  ];
  return cols;
};

export const guardianColumn = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'guardianName', title: 'Guardian Name' },
    { dataIndex: 'guardianContactNo', title: 'Guardian Contact No' },
    { dataIndex: 'guardianAddress1', title: 'Address Line1' },
    { dataIndex: 'guardianAddress2', title: 'Address Line2' },
    { dataIndex: 'guardianAddress3', title: 'Address Line3' },
    { dataIndex: 'guardianLoc', title: 'Location Category' },
    { dataIndex: 'guardianCity', title: 'City' },
    { dataIndex: 'guardianDistrict', title: 'District' },
    { dataIndex: 'guardianState', title: 'State' },
    { dataIndex: 'guardianCountry', title: 'Country' },
    { dataIndex: 'guardianPincode', title: 'Pincode' },
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
  return JSON.stringify({ address: { ...data } });
};
