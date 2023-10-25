import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import moment from 'moment';
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

  passportNumber: { type: 'string', db: 'passport_number' },
  passportDob: { type: 'date', db: 'passport_dob' },
  passportFullName: { type: 'string', db: 'passport_full_name' },
  passportFatherName: { type: 'string', db: 'passport_father_name' },
  passportIssueDate: { type: 'date', db: 'passport_issue_date' },
  passportExpiryDate: { type: 'date', db: 'passport_expiry_date' },
  passportAddress: { type: 'string', db: 'passport_address' },
  passportPlaceOfBirth: { type: 'string', db: 'passport_place_of_birth' },
  passportIssuePlace: { type: 'string', db: 'passport_issue_place' },
  passportDocument: { type: 'string', db: 'passport_document' },
};

export const schemaRules = yup.object().shape({
  passportNumber: yup.string().required().nullable(),
  passportDob: yup.string().required().test('future-date', 'Date of birth cannot be in the future', (value) => {
    // use moment to check if the selected date is after the current date
    return moment(value).isSameOrBefore(moment());
  }).nullable(),
  passportFullName: yup.string().required().nullable(),
  passportFatherName: yup.string().required().nullable(),
  passportExpiryDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!moment(formValues.passportExpiryDate).isAfter(formValues.passportDob)) {
        if (!moment(formValues.passportExpiryDate).isAfter(formValues.passportIssueDate)) {
          return schema.test('failed', 'Expiry date must be after issue date', (value, { createError }) => {
            return false;
          });
        }
        else {
          return schema.test('failed', 'Expiry date must be after date of birth', (value, { createError }) => {
            return false;
          });
        }
      }
      return schema.notRequired();
    }).nullable(),
  passportIssueDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!moment(formValues.passportIssueDate).isAfter(formValues.passportDob)) {
        return schema.test('failed', 'Issue date must be after date of birth', (value, { createError }) => {
          return false;
        });
      }
      return schema.notRequired();
    }).nullable(),
  passportIssuePlace: yup.string().required().nullable(),
  passportAddress: yup.string().required().nullable(),
  passportPlaceOfBirth: yup.string().required().nullable(),
  passportDocument: yup.string().required().nullable(),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'passportNumber', title: 'Passport Number' },
    { dataIndex: 'passportDob', title: 'Date of Birth' },
    { dataIndex: 'passportFullName', title: 'Full name' },
    { dataIndex: 'passportFatherName', title: 'Father\'s Name' },
    { dataIndex: 'passportIssueDate', title: 'Date of Issue' },
    { dataIndex: 'passportExpiryDate', title: 'Expire\'s On' },
    { dataIndex: 'passportIssuePlace', title: 'Place of Issue' },
    { dataIndex: 'passportAddress', title: 'Address' },
    { dataIndex: 'passportPlaceOfBirth', title: 'Place of Birth' },
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
  return JSON.stringify(data);
};
