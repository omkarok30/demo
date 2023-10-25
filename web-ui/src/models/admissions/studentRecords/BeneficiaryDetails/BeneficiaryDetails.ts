import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

import { convertForSubmit } from '@/utils/cast';

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
  studentId: { type: 'string', db: 'id' },
  feesCategory: { type: 'string', db: 'fees_category' },
  admissionCategory: { type: 'string', db: 'admission_category' },
  admissionType: { type: 'string', db: 'admission_type' },
  admissionSubType: { type: 'string', db: 'admission_sub_type' },
  hostellite: { type: 'boolean', db: 'hostellite' },
  parentOccupation: { type: 'string', db: 'parent_occupation' },
  otherOccupation: { type: 'string', db: 'other_occupation' },
  familyIncome: { type: 'number', db: 'family_income' },
  appliedGovernmentScholarship: { type: 'string', db: 'applied_government_scholarship' },
  governmentApplicationId: { type: 'string', db: 'government_application_id' },
  governmentAmount: { type: 'number', db: 'government_amount' },
  governmentScheme: { type: 'string', db: 'government_scheme' },
  appliedInstituteScheme: { type: 'string', db: 'applied_institute_scheme' },
  instituteScheme: { type: 'string', db: 'institute_scheme' },
  instituteAmount: { type: 'number', db: 'institute_amount' },
  appliedPrivateScheme: { type: 'string', db: 'applied_private_scheme' },
  privateScheme: { type: 'string', db: 'private_scheme' },
  privateAmount: { type: 'number', db: 'private_amount' },
};

export const schemaRules = yup.object().shape({
  feesCategory: yup.string().required(),
  admissionCategory: yup.string().required(),
  admissionType: yup.string().required(),
  admissionSubType: yup.string().required(),
  hostellite: yup.string().required(),
  parentOccupation: yup.string().required(),
  otherOccupation: yup.string(),
  familyIncome: yup.number().required(),
  appliedGovernmentScholarship: yup.string().required(),
  governmentApplicationId: yup.string(),
  governmentAmount: yup.number(),
  governmentScheme: yup.string().required(),
  appliedInstituteScheme: yup.string().required(),
  instituteScheme: yup.string().required(),
  instituteAmount: yup.number(),
  appliedPrivateScheme: yup.string().required(),
  privateScheme: yup.string().required(),
  privateAmount: yup.number(),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'feesCategory', title: 'Fees Category' },
    { dataIndex: 'admissionCategory', title: 'Admission Category' },
    { dataIndex: 'admissionType', title: 'Type of Admission' },
    { dataIndex: 'admissionSubType', title: 'Admission Sub-Type' },
    { dataIndex: 'hostellite', title: 'Hostellite or Dayscholar?' },
    { dataIndex: 'parentOccupation', title: 'Occupation of Parent' },
    { dataIndex: 'otherOccupation', title: 'Other Occupation' },
    { dataIndex: 'familyIncome', title: 'Annual Income of Family (INR)' },
    { dataIndex: 'appliedGovernmentScholarship', title: 'Applied for Government scholarship?' },
    { dataIndex: 'governmentApplicationId', title: 'Application ID' },
    { dataIndex: 'governmentAmount', title: 'Amount in Rupees (INR)' },
    { dataIndex: 'governmentScheme', title: 'Scheme Name' },
    { dataIndex: 'appliedInstituteScheme', title: 'Has the student benefitted from Institutes Beneficiary Scheme(s)?' },
    { dataIndex: 'instituteScheme', title: 'Institutes Beneficiary Scheme' },
    { dataIndex: 'instituteAmount', title: 'Amount in Rupees (INR)' },
    { dataIndex: 'appliedPrivateScheme', title: 'Has the student benefitted from Private Beneficiary Scheme(s)?' },
    { dataIndex: 'privateScheme', title: 'Private Beneficiary Scheme' },
    { dataIndex: 'privateAmount', title: 'Amount in Rupees (INR)' },
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
  return JSON.stringify({ beneficiaryDetails: { ...data } });
};
