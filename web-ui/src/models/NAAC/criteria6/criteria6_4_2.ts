import { ColumnsType } from 'antd/lib/table';
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
  props: { type: 'json', db: 'props' },
  // This record should be fetched from student record beneficiery details
  academicYear: { type: 'int', db: 'academic_year' },
  fundsReceived: { type: 'int', db: 'funds_received' },
  nameOfFundingAgency: { type: 'string', db: 'name_of_funding_agency' },
  purposeOfGrant: { type: 'string', db: 'purpose_of_grant' },
  link: { type: 'string', db: 'relevant_document' },
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  academicYear: yup.string().required('required'),
  fundsReceived: yup.number().required('Please enter participants')
    .test(
      'Number of Participant',
      'Should be greather than or equal to 0',
      value => value !== undefined && value >= 0,
    ),
  nameOfFundingAgency: yup.string().required('required'),
  purposeOfGrant: yup.string().required('required'),
  link: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'academicYear', title: 'Year', width: 100 },
  ];
  return cols;
};

export const columnsFunds = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr. No', width: 100 },
    {
      dataIndex: 'nameOfFundingAgency',
      title: 'Name of the non government funding agencies/ individuals',
      render: (_, record) => {
        return record.nameOfFundingAgency ? record.nameOfFundingAgency : '';
      },
    },
    { dataIndex: 'purposeOfGrant', title: 'Purpose of the Grant' },
    {
      dataIndex: 'fundsReceived',
      title: 'Funds/ Grants received (INR In Lakhs)',
      render: (_, record) => {
        return record.fundsReceived ? record.fundsReceived : '';
      },
    },
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
  return JSON.stringify({ NAACCriteria642: { ...data } });
};
