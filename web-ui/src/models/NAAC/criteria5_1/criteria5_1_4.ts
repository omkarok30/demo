import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import { convertForSubmit } from '@/utils/cast';
import * as studentPromotionMap from '@/models/promotion/studentPromotionMap';
import * as studentBeneiciaryDetails from '@/models/admissions/studentRecords/BeneficiaryDetails/ScholarshipDetails';

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
  // This record should be fetched from student record beneficiery details
  year: { type: 'string', db: 'year' },
  [`${studentBeneiciaryDetails.allColumns.studentId}.count`]: studentBeneiciaryDetails.allColumns.studentId,
  [`${studentPromotionMap.allColumns.studId}.count`]: studentPromotionMap.allColumns.studId,
};

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'year', title: 'Year', width: 100 },
  ];
  return cols;
};

export const activityColumns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No', width: 100 },
  ];
  return cols;
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  year: yup.string().required('required'),
  counselStudents: yup.string().required('required'),
  totalNoOfStudents: yup.string().required('required'),
});

export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ NAACCriteria514: { ...data } });
};
